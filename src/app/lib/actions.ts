'use server';

import { z } from 'zod';
import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { signIn } from '../../auth';
import { AuthError } from 'next-auth';
import bcrypt from 'bcrypt';
import { writeFile } from "fs/promises";
import path from "path";
import { NextResponse } from "next/server";

const ProductSchema = z.object({
  id:z.string(),
  name:z.string(),
  category:z.string(),
  description:z.string(),
  price: z.coerce
  .number()
  .gt(0, { message: 'Please enter an amount greater than $0.' }),
  image_url:z.string(),
  published:z.boolean(),
  artisan_id:z.string()
})

export type State = {
  errors?: {
    name?: string[];
    description?: string[];
  };
  message?: string | null;
};

const CreateProduct= ProductSchema.omit({ id: true});

export async function createProduct(prevState: State, formData: FormData) {
  
  const file = formData.get("image_url") as File;

  const buffer = Buffer.from(await file.arrayBuffer());
  const filename =  file.name.replaceAll(" ", "_");
  //console.log(filename);
  try {
    await writeFile(
      path.join(process.cwd(), "public/products/" + filename),
      buffer
    );
  } catch (error) {
    console.log("Error occured ", error);
    return {
      message: 'Server Error: Failed to Upload File.',
    };
  }
  //console.log(file)
  // Validate form using Zod
  const validatedFields = CreateProduct.safeParse({
    name: formData.get('name'),
    category: formData.get('category'),
    description: formData.get('description'),
    price: formData.get('price'),
    image_url: file.name!='undefined'?'/products/'+filename:'/products/noimage.png',
    published: formData.get('published')=='published'?true:false,
    artisan_id: formData.get('artisan_id'),
  });
 
  
  // If form validation fails, return errors early. Otherwise, continue.
  if (!validatedFields.success) {
    console.log(validatedFields.error.flatten().fieldErrors);
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Create Product.',
    };
  }
 

  // Prepare data for insertion into the database
  const { name,category,description,price,image_url,published, artisan_id} = validatedFields.data;
  const priceInCents = price * 100;
  // Insert data into the database
  try {
    await sql`
      INSERT INTO items (name,category,description,price,image_url,published,artisan_id)
      VALUES (${name},${category},${description},${priceInCents},${image_url},${published},${artisan_id})
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

const UpdateProduct= ProductSchema.omit({ id: true});

export async function updateProduct(
  id: string,
  prevState: State,
  formData: FormData,
) {
  
  const file = formData.get("image_url") as File;

  const buffer = Buffer.from(await file.arrayBuffer());
  const filename =  file.name.replaceAll(" ", "_");
  //console.log(filename);
  try {
    await writeFile(
      path.join(process.cwd(), "public/products/" + filename),
      buffer
    );
  } catch (error) {
    console.log("Error occured ", error);
    return {
      message: 'Server Error: Failed to Upload File.',
    };
  }
  const validatedFields = UpdateProduct.safeParse({
    name: formData.get('name'),
    category: formData.get('category'),
    description: formData.get('description'),
    price: formData.get('price'),
    image_url: file.name!='undefined'?'/products/'+filename:'',
    published: formData.get('published')=='published'?true:false,
    artisan_id: formData.get('artisan_id'),
  });
 
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Update Invoice.',
    };
  }
 
  const { name,category,description,price,image_url,published, artisan_id} = validatedFields.data;
  const priceInCents = price * 100;
 
  try {
    if (image_url!='')
    {
      await sql`
        UPDATE items
        SET name = ${name}, category = ${category}, description = ${description}, image_url = ${image_url}, published = ${published}, artisan_id = ${artisan_id}, price=${priceInCents}
        WHERE id = ${id}
      `;
    }
    else{
      await sql`
        UPDATE items
        SET name = ${name}, category = ${category}, description = ${description}, published = ${published}, artisan_id = ${artisan_id}, price=${priceInCents}
        WHERE id = ${id}
      `;
    }
  } catch (error) {
    return { message: 'Database Error: Failed to Update Invoice.' };
  }
 
  revalidatePath('/home/myproducts');
  redirect('/home/myproducts');
}

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
