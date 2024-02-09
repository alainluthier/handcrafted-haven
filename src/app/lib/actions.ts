'use server';

import { z } from 'zod';
import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { signIn } from '../../auth';
import { AuthError } from 'next-auth';
import bcrypt from 'bcrypt';

const ProductSchema = z.object({
  id:z.string(),
  name:z.string(),
  category:z.string(),
  description:z.string(),
  price:z.number(),
  image_url:z.string(),
  published:z.boolean(),
  artisan_id:z.string()
})

export type State = {
  errors?: {
    name?: string[];
    category?: string[];
    description?: string[];
  };
  message?: string | null;
};

const CreateProduct= ProductSchema.omit({ id: true});

export async function createProduct(prevState: State, formData: FormData) {
  // Validate form using Zod
  const validatedFields = CreateProduct.safeParse({
    name: formData.get('name'),
    category: formData.get('category'),
    description: formData.get('description'),
    price: formData.get('price'),
    image_url: formData.get('image_url'),
    published: formData.get('published'),
    artisan_id: formData.get('artisan_id'),
  });
 
  // If form validation fails, return errors early. Otherwise, continue.
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Create Product.',
    };
  }
 
  // Prepare data for insertion into the database
  const { name,category,description,price,image_url,published, artisan_id} = validatedFields.data;

  // Insert data into the database
  try {
    await sql`
      INSERT INTO items (name,category,description,price,image_url,published,artisan_id)
      VALUES (${name},${category},${description},${price},${image_url},${published},${artisan_id})
    `;
  } catch (error) {
    
    return {
      message: 'Database Error: Failed to Create Invoice.',
    };
  }
 

  revalidatePath('/home/myproducts');
  redirect('/home/myproducts');
}

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
  const { email, password, role, name } = UserSchema.parse({
    email: formData.get('email'),
    password: formData.get('password'),
    confirmPassword: formData.get('confirm-password'),
    role: formData.get('type'),
    name: formData.get('name')
  })
  const hashedPassword = await bcrypt.hash(password, 10);
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

export async function deleteProduct(id: string) {
  try {
    await sql`DELETE FROM items WHERE id = ${id}`;
    revalidatePath('/home/myproducts');
    return { message: 'Deleted Product' };
  } catch (error) {
    return { message: 'Database Error: Failed to Delete Product' };
  }
}
