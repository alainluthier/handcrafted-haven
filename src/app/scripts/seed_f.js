const { db } = require('@vercel/postgres');


//FIRST, FOLLOW THE STEPS IN CHAPTER 6 OF THE TUTORIAL, AND BEFORE SEED THE DATABASE IN TE THERMINAL NEED
//TO BE TYPED : " npm i @vercel/postgres "

import { users, artisans, categories, products } from "../lib/fer-placeholder-data.js";
const bcrypt = require('bcrypt');



async function categoryTable(client) {
    try {
        await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;


        const createTable = await client.sql`
        CREATE TABLE IF NOT EXISTS category (
        category_id SERIAL PRIMARY KEY,
        category_name VARCHAR(255) NOT NULL
      );
    `;

        console.log('table "category" created');

        const insertCategories = await Promise.all(
            categories.map(async (category) => {
                return await client.sql`
            INSERT INTO category (category_id, category_name)
            VALUES(${category.category_id}, ${category.category_name})
        `;
            })
        );

        console.log(`Seeded ${insertCategories.length} categories`);

        return {
            createTable,
            category: insertCategories
        };
    } catch (error) {
        console.error('Error al sembrar la tabla "category":', error);
        throw error;
    }
}



async function userTable(client) {
    try {
        await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

        // Crear la tabla "user" si no existe
        const createTable = await client.sql`
        CREATE TABLE IF NOT EXISTS users (
        user_id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        username VARCHAR(255) NOT NULL UNIQUE,
        enabled BOOLEAN NOT NULL,
        role VARCHAR(20) NOT NULL,
        password VARCHAR(255) NOT NULL,
        phone VARCHAR(20) NULL,
        email VARCHAR(255) NOT NULL
      );
    `;

        console.log('Table "users" created');



        const insertUsers = await Promise.all(
            users.map(async (user) => {
                const hashedPassword = await bcrypt.hash(user.password, 10);
                return client.sql`
                INSERT INTO users (user_id, username, enabled, role, password, phone, email)
                VALUES (${user.user_id}, ${user.username}, ${user.enabled}, ${user.role}, ${hashedPassword}, ${user.phone}, ${user.email})
                ON CONFLICT (user_id) DO NOTHING;
                `;
            }),
        );

        console.log(`Seeded ${insertUsers.length} users`);


        return {
            createTable,
            users: insertUsers,
        };
    } catch (error) {
        console.error('Error seeding "user":', error);
        throw error;
    }
}

async function artisanTable(client) {
    try {
        await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

        // Crear la tabla "artisan" si no existe
        const createTable = await client.sql`
        CREATE TABLE IF NOT EXISTS artisan (
        artisan_id SERIAL PRIMARY KEY,
        user_id UUID NOT NULL,
        history VARCHAR(45) NULL,
        CONSTRAINT fk_artisan_id FOREIGN KEY (user_id) REFERENCES users (user_id)
      );
    `;

        console.log('Table "artisan" created');


        const insertArtisan = await Promise.all(
            artisans.map(async (artisan) => {
                return client.sql`
                INSERT INTO artisan (user_id, history)
                VALUES (${artisan.user_id}, ${artisan.history});
                `;
            }),
        );


        console.log(`Seeded ${insertArtisan.length} artisans`);

        return {
            createTable,
            artisan: insertArtisan
        };
    } catch (error) {
        console.error('Error seeding "artisan":', error);
        throw error;
    }
}

async function itemTable(client) {
    try {
        await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

        const createTable = await client.sql`
        CREATE TABLE IF NOT EXISTS item (
        item_id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        category_id INT NOT NULL,
        description TEXT NULL,
        price DECIMAL(10,2) NOT NULL,
        imageUrl VARCHAR(255) NULL,
        published BOOLEAN NOT NULL,
        artisan_id INT NOT NULL,
        CONSTRAINT fk_item_artisan FOREIGN KEY (artisan_id) REFERENCES artisan (artisan_id),
        CONSTRAINT fk_category_item FOREIGN KEY (category_id) REFERENCES category (category_id) 
         );
    `;

        console.log('Tabla "item" creada');


        const insertItems = await Promise.all(
            products.map(async (product) => {
                return await client.sql`
            INSERT INTO item (name, category_id, description, price, imageUrl, published, artisan_id)
            VALUES(${product.name}, ${product.category_id}, ${product.description}, ${product.price}, ${product.imageUrl}, ${product.published}, ${product.artisan_id})
        `;
            })
        );
        
        console.log(`Seeded ${insertItems.length} items`);
        return {
            createTable,
            item: insertItems,
        };
    } catch (error) {
        console.error('Error seeding "item":', error);
        throw error;
    }
}

async function commentsTable(client) {
    try {
        await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;


        const createTable = await client.sql`
        CREATE TABLE IF NOT EXISTS comments (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        comment TEXT NULL,
        rate INT NOT NULL,
        user_id UUID NOT NULL,
        item_id UUID NOT NULL,
        CONSTRAINT fk_comments_user FOREIGN KEY (user_id) REFERENCES users (user_id) ,
        CONSTRAINT fk_comments_item FOREIGN KEY (item_id) REFERENCES item (item_id) 
      );
    `;

        console.log('Tabla "comments" creada');

        return {
            createTable
        };
    } catch (error) {
        console.error('Error al sembrar la tabla "comments":', error);
        throw error;
    }
}





async function main() {
    const client = await db.connect();

    await categoryTable(client);
    await userTable(client);
    await artisanTable(client);
    await itemTable(client);
    await commentsTable(client);


    await client.end();
}

main().catch((err) => {
    console.error('Ocurrió un error al intentar sembrar la base de datos:', err);
});
