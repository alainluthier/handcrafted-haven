import { sql } from '@vercel/postgres';
import { unstable_noStore as noStore } from 'next/cache';
import { Item, ItemFiltered } from './definitions_f';

export async function fetchProducts() {
    noStore();

    try {
        console.log("Fetching products data");

        const data = await sql<Item>`SELECT * FROM items;`;
        console.log('Data fetch completed.');

        return data.rows;

    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to fetch revenue data.');
    }
};


const ITEMS_PER_PAGE = 8;

export async function fetchFilteredProducts(
    query: string,
    currentPage: number,
) {
    noStore();
    const offset = (currentPage - 1) * ITEMS_PER_PAGE;

    try {
        const filteredProducts = await sql<ItemFiltered>`
      SELECT
        items.id,
        items.name,
        items.category,
        items.description,
        items.image_url,
        items.published,
        items.artisan_id,
        items.price,
        users_.email
      FROM items
      JOIN users_ ON items.artisan_id = users_.id
      WHERE
        items.name ILIKE ${`%${query}%`} OR
        items.category ILIKE ${`%${query}%`} OR
        users_.email ILIKE ${`%${query}%`}
      ORDER BY items.name DESC
      LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
    `;
        const products = filteredProducts.rows.map((product) => ({
            ...product,
            price: product.price / 100,
        }));
        return products;
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to fetch items.');
    }
}





export async function fetchProductById(id: string) {
    noStore();

    try {
        console.log("Fetching product data");
        await new Promise((resolve) => setTimeout(resolve, 3000));

        const data = await sql<Item>`SELECT * FROM items WHERE id = ${id}`;
        console.log('Data fetch completed after 3 seconds.');

        return data.rows;

    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to fetch revenue data.');
    }
}



export async function fetchProductsPages(query: string) {
    noStore();
    try {
        const count = await sql`SELECT COUNT(*)
    FROM items
    JOIN users_ ON items.artisan_id = users_.id
    WHERE
      users_.email ILIKE ${`%${query}%`} OR
      items.name ILIKE ${`%${query}%`} OR
      items.category ILIKE ${`%${query}%`}
  `;

        const totalPages = Math.ceil(Number(count.rows[0].count) / ITEMS_PER_PAGE);
        return totalPages;
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to fetch total number of products.');
    }
}



export async function fetchProductsByCategory(
    query: string,
    currentPage: number,
) {
    noStore();
    const offset = (currentPage - 1) * ITEMS_PER_PAGE;

    try {
        const filteredProducts = await sql<ItemFiltered>`
      SELECT
        items.id,
        items.name,
        items.category,
        items.description,
        items.image_url,
        items.published,
        items.artisan_id,
        items.price,
        users_.email
      FROM items
      JOIN users_ ON items.artisan_id = users_.id
      WHERE
        items.category = ${`%${query}%`}
      ORDER BY items.name DESC
      LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
    `;
        const products = filteredProducts.rows.map((product) => ({
            ...product,
            price: product.price / 100,
        }));
        return products;
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to fetch items by category.');
    }
}


export async function fetchProductsByPriceHight(
    currentPage: number,
) {
    noStore();
    const offset = (currentPage - 1) * ITEMS_PER_PAGE;

    try {
        const filteredProducts = await sql<ItemFiltered>`
      SELECT
        items.id,
        items.name,
        items.category,
        items.description,
        items.image_url,
        items.published,
        items.artisan_id,
        items.price,
        users_.email
      FROM items
      JOIN users_ ON items.artisan_id = users_.id
      ORDER BY items.price DESC
      LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
    `;
        const products = filteredProducts.rows.map((product) => ({
            ...product,
            price: product.price / 100,
        }));
        return products;
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to fetch items by category.');
    }
}




export async function fetchProductsByPriceLow(
    currentPage: number,
) {
    noStore();
    const offset = (currentPage - 1) * ITEMS_PER_PAGE;

    try {
        const filteredProducts = await sql<ItemFiltered>`
      SELECT
        items.id,
        items.name,
        items.category,
        items.description,
        items.image_url,
        items.published,
        items.artisan_id,
        items.price,
        users_.email
      FROM items
      JOIN users_ ON items.artisan_id = users_.id
      ORDER BY items.price ASC
      LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
    `;
        const products = filteredProducts.rows.map((product) => ({
            ...product,
            price: product.price / 100,
        }));
        return products;
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to fetch items by category.');
    }
}