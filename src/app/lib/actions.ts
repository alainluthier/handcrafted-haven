'use server';

import { z } from 'zod';
import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { signIn } from '../../auth';
import { AuthError } from 'next-auth';
import bcrypt from 'bcrypt';

const UserSchema = z.object({
  id: z.string().optional(),
  email: z.string(),
  role: z.enum(['customer', 'artisan']),
  password: z.string().min(6),
  confirmPassword: z.string().min(6),
  name: z.string(),
  image_url: z.string().optional(),
  phone: z.string().optional()
}).superRefine(({ confirmPassword, password }, ctx) => {
  if (confirmPassword !== password) {
    ctx.addIssue({
      code: "custom",
      message: "The passwords did not match"
    });
  }
});



export async function createUser(formData: FormData) {
  const{email,password,role,name} = UserSchema.parse({
    email: formData.get('email'),
    password: formData.get('password'),
    confirmPassword: formData.get('confirm-password'),
    role: formData.get('type'),
    name: formData.get('name')
  })
  const hashedPassword = await bcrypt.hash(password,10);
  await sql`
  INSERT INTO users_ (email, role,password,name)
  VALUES (${email}, ${role}, ${hashedPassword}, ${name})
  `;

  redirect('/login');
}

export async function authenticate(
    prevState: string | undefined,
    formData: FormData,
  ) {
    try {
      await signIn('credentials', formData);
    } catch (error) {
      if (error instanceof AuthError) {
        switch (error.type) {
          case 'CredentialsSignin':
            return 'Invalid credentials.';
          default:
            return 'Something went wrong.';
        }
      }
      throw error;
    }
  }