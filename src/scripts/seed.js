const { db } = require('@vercel/postgres');

const {users,items,comments} = require('../app/lib/placeholder-data.js')
//FIRST, FOLLOW THE STEPS IN CHAPTER 6 OF THE TUTORIAL, AND BEFORE SEED THE DATABASE IN TE THERMINAL NEED
//TO BE TYPED : " npm i @vercel/postgres "

const bcrypt = require('bcrypt');


async function seedUserTable(client) {
    try {
        await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

        // Crear la tabla "user" si no existe
        const createTable = await client.sql`
      CREATE TABLE IF NOT EXISTS users_ (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        email VARCHAR(255) NOT NULL unique,
        role VARCHAR(20) NOT NULL,
        password VARCHAR(255) NOT NULL,
        name varchar(255) not null,
        image_url varchar(500) null,
        phone VARCHAR(20) NULL
      );
    `;

        console.log('Table "user" created');

        const insertedUsers = await Promise.all(
            users.map(async (user) => {
              const hashedPassword = await bcrypt.hash(user.password, 10);
              return client.sql`
              INSERT INTO users_ (id, email, role, password, name, phone, image_url)
              VALUES (${user.id}, ${user.email}, ${user.role}, ${hashedPassword}, ${user.name}, ${user.image_url}, ${user.phone})
              ON CONFLICT (id) DO NOTHING;
            `;
            }),
          );
      
        console.log(`Seeded ${insertedUsers.length} users`);

        return {
            createTable,
        };
    } catch (error) {
        console.error('Error seeding "user":', error);
        throw error;
    }
}

async function seedItemTable(client) {
    try {
        await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

        const createTable = await client.sql`
      CREATE TABLE IF NOT EXISTS items (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        category VARCHAR(45) NOT NULL,
        description VARCHAR(2000) NULL,
        price DECIMAL(10,2) NOT NULL,
        image_url VARCHAR(255) NULL,
        published BOOLEAN NOT NULL,
        artisan_id UUID NOT NULL);
    `;

        console.log('Table "items" created');

        // Insert data into the "item" table
        const insertedItems = await Promise.all(
        items.map(
          (item) => client.sql`
          INSERT INTO items (id, name, category, description, price, image_url, published, artisan_id)
          VALUES (${item.id}, ${item.name},${item.category}, ${item.description}, ${item.price}, ${item.image_url},${item.published},${item.artisan_id})
          ON CONFLICT (id) DO NOTHING;
        `,
            ),
        );
  
        console.log(`Seeded ${insertedItems.length} item`);

        return {
            createTable
        };
    } catch (error) {
        console.error('Error seeding "item":', error);
        throw error;
    }
}

async function seedCommentsTable(client) {
    try {
        await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

        
        const createTable = await client.sql`
      CREATE TABLE IF NOT EXISTS comments (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        comment varchar(255) NULL,
        rate INTEGER NOT NULL,
        item_id uuid not null,
        user_id uuid not null
      );
    `;

        console.log('Table "comments" created');
        // Insert data into the "item" table
        const insertedComments = await Promise.all(
            comments.map(
              (comment) => client.sql`
              INSERT INTO comments (id, comment, rate, item_id, user_id)
              VALUES (${comment.id}, ${comment.comment},${comment.rate}, ${comment.item_id}, ${comment.user_id})
              ON CONFLICT (id) DO NOTHING;
            `,
                ),
            );

        console.log(`Seeded ${insertedComments.length} comments`);

        return {
            createTable
        };
    } catch (error) {
        console.error('Error to seed table "comments":', error);
        throw error;
    }
}

async function main() {
    const client = await db.connect();

    await seedUserTable(client);
    await seedItemTable(client);
    await seedCommentsTable(client);

    await client.end();
}

main().catch((err) => {
    console.error('Something went wrong with database creation', err);
});
