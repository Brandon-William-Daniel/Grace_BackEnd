const client = require("./client");
const {createUser, getAllUsers} = require("./users");
const {createProduct, getProductById, addProductToCart, createOrderDetail} = require("./products");
const {list} = require("./seedProducts");
const {createCatagory} = require("./catagories");
const {createReview} = require("./reviews");
const {joinDetailsToCart} = require("./orders")


async function dropTables() {
  console.log("Dropping All Tables...");
  try {
    await client.query(`
    
        DROP TABLE IF EXISTS "orderDetails";
        DROP TABLE IF EXISTS "orderLine";
        DROP TABLE IF EXISTS reviews;
        DROP TABLE IF EXISTS products;
        DROP TABLE IF EXISTS catagory;
        DROP TABLE IF EXISTS users;
    `);
    console.log("Flipped Tables");
  } catch (error) {
    console.log(error);
  }
}

async function createTables() {
  console.log("Starting to build tables...");
  // create all tables, in the correct order
    try {
      await client.query(`
      CREATE TABLE users(
        id SERIAL PRIMARY KEY,
        username VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        address TEXT,
        "isAdmin" BOOLEAN DEFAULT false
      );
      CREATE TABLE catagory(
        "id" SERIAL PRIMARY KEY,
        "catName" VARCHAR(255) UNIQUE NOT NULL
        
      );
      CREATE TABLE products(
        id SERIAL PRIMARY KEY,
        title VARCHAR(255),
        description TEXT,
        price DECIMAL NOT NULL,
        "invQty" INTEGER NOT NULL,
        photo TEXT,
        "catagoryId" INTEGER REFERENCES catagory(id),
        active BOOLEAN DEFAULT true
      );
      CREATE TABLE reviews(
        "productId" INTEGER REFERENCES products(id),
        "userId" INTEGER REFERENCES users(id),
        title VARCHAR(255),
        description TEXT,
        UNIQUE ("productId", "userId")
      );
      CREATE TABLE "orderLine"(
        "cartId" SERIAL PRIMARY KEY,
        "userId" INTEGER REFERENCES users(id),
        total NUMERIC,
        current BOOLEAN DEFAULT true,
        "shipTo" TEXT
      );
      CREATE TABLE "orderDetails"(
        id SERIAL PRIMARY KEY,
        "cartId" INTEGER REFERENCES "orderLine"("cartId"),
        "userId" INTEGER REFERENCES users(id),
        "productId" INTEGER REFERENCES products(id),
        quantity INTEGER,
        price DECIMAL
      );
      `)
      console.log("Tables Created");
    } catch (error) {
      console.log(error);
    }
}

/* 
Create initial data for table
*/

async function createInitialUsers() {
  console.log("Starting to create users...");
  try {
    const usersToCreate = [
        { 
          username: "Will", 
          password: "will123",
          email: "will@yahoo.com",
          address: "123 A St. Baton Rouge, LA",
          isAdmin: false
        },
        { 
          username: "Daniel", 
          password: "daniel123",
          email: "daniel@gmail.com",
          address: "456 B Ave. San Fransico, CA",
          isAdmin: true
        },
        { 
          username: "Brandon", 
          password: "brandon123",
          email: "brandon@aol.com",
          address: "789 Circle Sq. Cleveland, OH",
          isAdmin: true
        },
        { 
          username: "Cade", 
          password: "cade123",
          email: "cade@yahoo.com",
          address: "1112  D Ct. Raleigh, NC",
          isAdmin: true
        },
    ]
    const users = await Promise.all(usersToCreate.map(createUser));

    console.log("Finished creating users!");
  } catch (error) {
    console.error("Error creating users!");
    throw error
  }
}
async function createInitialCatagory() {
  try {
    console.log("Starting to create catagories...");

    const catagoriesToCreate = [
      { catName: "For Men" }, 
      { catName: "For Women" },
      { catName: "Outdoor" },
      { catName: "Cheap" },
      { catName: "Electronics" },
      { catName: "Home goods" },
      { catName: "Children" },
      { catName: "Clothing"},
      { catName: "Bathroom"},
      { catName: "Gifts"},
      { catName: "Holiday"},
      { catName: "Kitchen Ware"},
      { catName: "Pet Goods"}
    ];
    const catagories = await Promise.all(catagoriesToCreate.map(createCatagory));

    console.log("Finished creating Catagories!");
  } catch (error) {
    console.error("Error creating Catagories!");
    throw error;
  }
}

async function createInitialProducts() {
  console.log("starting to create products...");
  const productsToCreate = list();
  const products = await Promise.all(
    productsToCreate.map((products) => createProduct(products))
  );
  
  console.log("Finished creating products.");
}

async function createInitialReviews() {
  console.log("starting to create reviews...");

  const reviewToCreate = [
    {
      productId: 1,
      userId: 2,
      title: "Retread Works",
      description: "It really worked to retread my bald tires. I stopped sliding in the rain",
    },
    {
      productId: 1,
      userId: 3,
      title: "This is great",
      description: "I will never have to get another one ever again",
    },
    { 
      productId: 2,
      userId: 4,
      title: "Not that good",
      description: "This is one of the worst products i have ever used",
    },
    {
      productId: 3,
      userId: 1,
      title: "Price isnt the best",
      description: "It does everything I need it to i just wish it was a little cheaper",
    },
  ];
  const reviewscreated = await Promise.all(reviewToCreate.map(createReview));

  console.log("Finished creating reviews!");
}

async function createInitialDetails() {
  console.log("starting to create details...");

  const reviewToCreate = [
    {
      productId: 1,
      cartId: 1,
      userId: 1,
      quantity: 2,
      price: 32
      
    },
    {
      productId: 5,
      cartId: 1,
      userId: 1,
      quantity: 3,
      price: 12
      
    },
    { 
      productId: 2,
      userId: 1,
      quantity: 4,
      price: 45
      
    },
    {
      productId: 3,
      userId: 1,
      quantity: 1,
      price: 79
      
    },
  ];
  const reviewscreated = await Promise.all(reviewToCreate.map(createOrderDetail));

  console.log("Finished creating details!");
}


async function rebuildDB() {
  try {
    client.connect();
    await dropTables();
    await createTables();
    await createInitialUsers();
    await createInitialCatagory();
    await createInitialProducts();
    await createInitialReviews();
    await createInitialDetails();
console.log('testing area')
    
    await joinDetailsToCart(1)
console.log('Testing Done')

  } catch (error) {
    console.log("Error during rebuildDB");
    throw error
  }
}

module.exports = {
  rebuildDB,
  dropTables,
  createTables,
};