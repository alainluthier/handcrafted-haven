import { User } from './definitions';
import { sql } from '@vercel/postgres';
import { unstable_noStore as noStore } from 'next/cache';
import {
    Item
  } from './definitions';
  const ITEMS_PER_PAGE = 6;
  export async function fetchFilteredProducts(
    query: string,
    userid:string,
    currentPage: number,
  ) {
    noStore();
    const offset = (currentPage - 1) * ITEMS_PER_PAGE;
  
    try {
        //console.log(userid);
      const products = await sql<Item>`
        SELECT
          id,
          name,
          category,
          description,
          price,
          image_url,
          published
        FROM items
        WHERE
          artisan_id::text = ${`${userid}`} AND (
          category ILIKE ${`%${query}%`} OR
          name ILIKE ${`%${query}%`} OR
          description ILIKE ${`%${query}%`} )
        ORDER BY name DESC
        LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
      `;
  
      return products.rows;
    } catch (error) {
      console.error('Database Error:', error);
      throw new Error('Failed to fetch products.');
    }
  }

  export async function fetchProductsPages(query: string,userid: string) {
    noStore();
    try {
      const count = await sql`SELECT COUNT(*)
      FROM items
      WHERE
        artisan_id::text= ${`${userid}`} AND (
        category ILIKE ${`%${query}%`} OR
        name ILIKE ${`%${query}%`} OR
        description ILIKE ${`%${query}%`} )
    `;
  
      const totalPages = Math.ceil(Number(count.rows[0].count) / ITEMS_PER_PAGE);
      return totalPages;
    } catch (error) {
      console.error('Database Error:', error);
      throw new Error('Failed to fetch total number of products.');
    }
  }

  export async function fetchProductById(id: string) {
    noStore();
    try {
      const data = await sql<Item>`
        SELECT
            id,
            name,
            category,
            description,
            price,
            image_url,
            published
        FROM items
        WHERE id = ${id};
      `;
    const product = data.rows.map((product) => ({
        ...product,
        price: product.price / 100,
      }));
      
      //console.log(product); 
      return product[0];
    } catch (error) {
      console.error('Database Error:', error);
      throw new Error('Failed to fetch product.');
    }
  }

  export async function getUserById(id: string){
    noStore();
    try {
      const user = await sql<User>`SELECT * FROM users_ WHERE id::text=${id}`;
      return user.rows[0];
    } catch (error) {
      console.error('Failed to fetch user:', error);
      throw new Error('Failed to fetch user.');
    }
  }