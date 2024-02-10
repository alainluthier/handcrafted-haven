const users = [{
    user_id: '410544b2-4001-4271-9855-fec4b6a6442a',
    username: 'admin',
    enabled: true,
    role: 'artisan',
    password: '123456',
    phone: '123456789',
    email: 'admin@admin.com',
}];

const artisans = [{
    user_id: '410544b2-4001-4271-9855-fec4b6a6442a',
    history: 'Armando Velázquez, a passionate self-taught artisan, seamlessly blends tradition with innovation in his workshop nestled in the heart of a quaint village. With skillful expertise, he breathes life into unique pieces that tell stories. From delicate jewelry to intricate decor items, his creations reflect a profound reverence for nature and craftsmanship. Inspired by the beauty around him, Armando transforms simple materials into masterpieces, connecting with his audience through authenticity and a love for his craft. Each creation is a testament to his dedication to timeless craftsmanship, weaving a narrative of artistry and soulful expression.',
}];




const categories = [
    { category_id: 1, category_name: "Jeweler's" },
    { category_id: 2, category_name: "Home decoration" },
    { category_id: 3, category_name: "Clothes and accessories" },
    { category_id: 4, category_name: "Wood handicrafts" },
    { category_id: 5, category_name: "Beauty products" },
    { category_id: 6, category_name: "Toys and Items for Children" },
    { category_id: 7, category_name: "Stationery" },
    { category_id: 8, category_name: "Ceramics and Pottery" },
    { category_id: 9, category_name: "Recycled products" },
];


const products = [
    {
        name: "kenieTu wool knitted hat",
        category_id: 3,
        description: "The KenieTu wool knitted hat is a handmade, cozy accessory that seamlessly blends style and warmth.Crafted with high - quality wool, this hat features a unique design with intricate knit patterns for a fashionable look.Its softness and stretch provide a comfortable fit for all head sizes.Perfect for chilly days, this hat not only keeps you warm but also adds a stylish touch to your outfit.An ideal choice for staying snug with a hint of elegance in every winter season.",
        price: 15.50,
        imageUrl: "/catalog/cap.jpg",
        published: true,
        artisan_id: 1,
    },
    {
        name: "Elegance Blossom Ring",
        category_id: 1,
        description: "An exquisitely crafted ring celebrating the beauty of nature. With intricate floral details, this ring is a masterpiece of craftsmanship.",
        price: 50.00,
        imageUrl: "/catalog/r1.jpg",
        published: true,
        artisan_id: 1,
    }, {
        name: "Serenity Infinity Band",
        category_id: 1,
        description: "This modern design ring features an infinity symbol representing eternity and everlasting connection. Precision-crafted to bring a touch of serenity to any occasion.",
        price: 35.99,
        imageUrl: "/catalog/r2.jpg",
        published: true,
        artisan_id: 1,
    },
    {
        name: "Celestial Starlight Ring",
        category_id: 1,
        description: "A dazzling ring capturing the magic of the night sky. Adorned with twinkling stars, this celestial ring illuminates any ensemble with its unique charm.",
        price: 52.50,
        imageUrl: "/catalog/r3.jpg",
        published: true,
        artisan_id: 1,
    },
    {
        name: "Timeless Solitaire Elegance",
        category_id: 1,
        description: "A classic and timeless ring showcasing a radiant solitaire. The elegant simplicity of this ring highlights the unique beauty of the gemstone.",
        price: 45.50,
        imageUrl: "/catalog/r4.jpg",
        published: true,
        artisan_id: 1,
    },
    {
        name: "Artisan Crafted Wave Ring",
        category_id: 1,
        description: "An artisan-crafted ring capturing the essence of the ocean in a rippling design. Every detail reflects the artisan's skill and the beauty of nature.",
        price: 35.50,
        imageUrl: "/catalog/r5.jpg",
        published: true,
        artisan_id: 1,
    },
    {
        name: "Subtle Birthstone Accent",
        category_id: 1,
        description: "A delicate ring with a subtle birthstone accent. Personalized and meaningful, perfect for everyday wear.",
        price: 18.50,
        imageUrl: "/catalog/r6.jpg",
        published: true,
        artisan_id: 1,
    },
    {
        name: "Minimalist Silver Stack",
        category_id: 1,
        description: "A set of minimalist stacking rings in sterling silver. Effortlessly chic and perfect for layering.",
        price: 65.50,
        imageUrl: "/catalog/r7.jpg",
        published: true,
        artisan_id: 1,
    },
    {
        name: " Elegant Pearl Ring",
        category_id: 1,
        description: "An elegant ring adorned with a lustrous pearl. Adds a touch of sophistication to your look.",
        price: 15.50,
        imageUrl: "/catalog/r8.jpg",
        published: true,
        artisan_id: 1,
    },
    {
        name: "Vibrant Harmony Necklace",
        category_id: 1,
        description: "The Vibrant Harmony Necklace is a delightful piece featuring an array of colorful and uniquely shaped beads. Each bead is carefully selected to create a harmonious blend of hues, bringing a playful and lively energy to your ensemble.",
        price: 33.00,
        imageUrl: "/catalog/c1.jpg",
        published: true,
        artisan_id: 1,
    },
    {
        name: "Woven Leather Bag",
        category_id: 1,
        description: "A handcrafted bag made with woven leather strips. Sturdy and stylish, this bag is perfect for everyday use with a rustic touch.",
        price: 35.50,
        imageUrl: "/catalog/b1.jpg",
        published: true,
        artisan_id: 3,
    },
    {
        name: "Handmade Denim Backpack",
        category_id: 1,
        description: "A backpack crafted with handmade denim. Practical and stylish, ideal for a casual and laid-back look.",
        price: 36.99,
        imageUrl: "/catalog/b2.jpg",
        published: true,
        artisan_id: 3,
    },
    {
        name: "Printed Fabric Bag",
        category_id: 1,
        description: "A bag crafted from hand-printed fabrics. With a colorful and cheerful design, this bag adds a touch of originality to your style.",
        price: 25.50,
        imageUrl: "/catalog/b3.jpg",
        published: true,
        artisan_id: 3,
    },
    {
        name: "Bohemian Macramé Bag",
        category_id: 1,
        description: "A bohemian bag crafted using macramé techniques. Its light and airy design makes it a relaxed choice for sunny days.",
        price: 58.50,
        imageUrl: "/catalog/b4.jpg",
        published: true,
        artisan_id: 3,
    },
    {
        name: "Woven Leather Bag",
        category_id: 1,
        description: " A handcrafted bag made with woven leather strips. Sturdy and stylish, this bag is perfect for everyday use with a rustic touch.",
        price: 19.99,
        imageUrl: "/catalog/b5.jpg",
        published: true,
        artisan_id: 3,
    }
];


module.exports = {
    users,
artisans,
categories,
products
};

// for (const category of categories) {
//     await client.sql`
//     INSERT INTO category (category_id, category_name)
//     VALUES (${category.category_id}, ${category.category_name});
//   `;
// }

/** CATEGORIES
 * 
 * 
 * 1 Jeweler's
2 Home decoration
3 Clothes and accessories
4 Wood handicrafts
5 Beauty products
6 Toys and Items for Children
7 Stationery
8 Ceramics and Pottery
9 Recycled products */