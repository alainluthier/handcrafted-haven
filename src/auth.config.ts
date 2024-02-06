import type { NextAuthConfig } from 'next-auth';
import { DefaultSession } from 'next-auth';
import { User as NextUser } from 'next-auth';

declare module "next-auth" {
  interface Session {
    user: {
      id: string,
      role: string,
    } & DefaultSession["user"]
  }
}
//https://github.com/nextauthjs/next-auth/issues/9122
export const authConfig = {
  pages: {
    signIn: '/login',
  },
  session: {
    strategy: "jwt",
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnHome = nextUrl.pathname.startsWith('/home');
      if (isOnHome) {
        if (isLoggedIn) return true;
        return false; // Redirect unauthenticated users to login page
      } else if (isLoggedIn) {
        return Response.redirect(new URL('/home', nextUrl));
      }
      return true;
    },
    jwt({ token, user }) {
      if (user) token.user = user;
      return token;
    },
    session(sessionArgs) {
     // token only exists when the strategy is jwt and not database, so sessionArgs here will be { session, token }
     // with a database strategy it would be { session, user } 
     if ("token" in sessionArgs) {
        let session = sessionArgs.session;
        if ("user" in sessionArgs.token) {
          const tokenUser = sessionArgs.token.user as NextUser;
          if (tokenUser.id) {
            session.user.id = tokenUser.id;
            return session;
          }
        }
     }
     return sessionArgs.session;
    },
  },
  providers: [], // Add providers with an empty array for now
} satisfies NextAuthConfig;