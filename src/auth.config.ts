import type { NextAuthConfig } from 'next-auth';
import { DefaultSession } from 'next-auth';
import { User } from './app/lib/definitions';
import { sql } from '@vercel/postgres';

export async function getUser(email: string): Promise<User | undefined> {
  try {
    const user = await sql<User>`SELECT * FROM users_ WHERE email=${email}`;
    return user.rows[0];
  } catch (error) {
    console.error('Failed to fetch user:', error);
    throw new Error('Failed to fetch user.');
  }
}

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
      const isOnCatalog = nextUrl.pathname.startsWith('/catalog');
      if (isOnHome) {
        if (isLoggedIn) return true;
        return false; 
      } else if(isOnCatalog){
        if (isLoggedIn) return true;
        return false; 
      }else if (isLoggedIn) {
        if (auth.user.role=='artisan')
          return Response.redirect(new URL('/home', nextUrl));
        else
          return Response.redirect(new URL('/catalog', nextUrl));
      }
      return true;
    },
    async jwt({ token, user }) {
      if (user) {
        if(user.email!=null){
          //console.log(user.email)
          token.user = await getUser(user.email|| '')
        }else{
          token.user=user;
        }
        //
      }
      return token;
    },
    session(sessionArgs) {
     // token only exists when the strategy is jwt and not database, so sessionArgs here will be { session, token }
     // with a database strategy it would be { session, user } 
     if ("token" in sessionArgs) {
        let session = sessionArgs.session;
        if ("user" in sessionArgs.token) {
          const tokenUser = sessionArgs.token.user as User;
          if (tokenUser.id) {
            session.user.id = tokenUser.id;
            session.user.role = tokenUser.role;
            return session;
          }
        }
     }
     return sessionArgs.session;
    },
  },
  providers: [], // Add providers with an empty array for now
} satisfies NextAuthConfig;