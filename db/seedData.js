const client = require("./client")



const {createUser, getAllUsers} = require('./users')
const {createProduct, getProductById} = require('./products')
const {list} = require('./seedProducts')
const {createCatagory} = require('./catagories')



async function dropTables() {
  console.log("Dropping All Tables...")
  try {
    await client.query(`
        
        DROP TABLE IF EXISTS "orderDetails";
        DROP TABLE IF EXISTS "orderLine";
        DROP TABLE IF EXISTS reviews;
        
        DROP TABLE IF EXISTS products;
        
        DROP TABLE IF EXISTS catagory;
        DROP TABLE IF EXISTS users;
    `)
    console.log("Flipped Tables")
  } catch (error) {
    console.log(error)
  }
}

async function createTables() {
  console.log("Starting to build tables...")
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
        price MONEY NOT NULL,
        invQty INTEGER NOT NULL,
        photo TEXT,
        "catagoryId" INTEGER REFERENCES catagory(id),
        active BOOLEAN DEFAULT true
      );
      CREATE TABLE reviews(
        "productId" INTEGER REFERENCES products(id),
        "userId" INTEGER REFERENCES users(id),
        title VARCHAR(255),
        review text,
        UNIQUE ("productId", "userId")
      );
      CREATE TABLE "orderLine"(
        id SERIAL PRIMARY KEY,
        "productId" INTEGER REFERENCES products(id),
        "userId" INTEGER REFERENCES users(id),
        total INTEGER,
        current BOOLEAN DEFAULT true,
        "shipTo" TEXT
      );
      CREATE TABLE "orderDetails"(
        "orderId" INTEGER REFERENCES "orderLine"(id),
        "productId" INTEGER REFERENCES products(id),
        quantity INTEGER,
        price MONEY
      );
      `)
      console.log("Tables Created")
    } catch (error) {
      console.log(error)
    }
}

/* 
Create initial data for table
*/

async function createInitialUsers() {
  console.log("Starting to create users...")
  try {
    const usersToCreate = [
        { username: "Will", 
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
    const users = await Promise.all(usersToCreate.map(createUser))

    // console.log("Users created:")
    // console.log(users)
    console.log("Finished creating users!")
  } catch (error) {
    console.error("Error creating users!")
    throw error
  }
}
async function createInitialCatagory() {
  try {
    console.log("Starting to create catagories...")

    const catagoriesToCreate = [
      { catName: "For Men"}, 
      { catName: "For Women"},
      { catName: "Outdoor"},
      { catName: "Cheap"},
      
    ]
    const catagories = await Promise.all(catagoriesToCreate.map(createCatagory))

    // console.log("activities created:")
    // console.log(activities)

    console.log("Finished creating Catagories!")
  } catch (error) {
    console.error("Error creating Catagories!")
    throw error
  }
}

async function createInitialProducts() {
  console.log("starting to create products...")
// console.log(list())
  const productsToCreate = [
    {
      title: "Tire Tread",
      description: 'Replace that tread that is slowly melting away',
      price: "35.69",
      invQty: "500",
      photo: 'https://static.grainger.com/rp/s/is/image/Grainger/448K72_AS01?hei=536&wid=536&$adapimg$=',
      catagoryId: 3
  },
  {
      title: "Blinker Fluid",
      description: 'Rehydrate with this special fluid',
      price: "87.00",
      invQty: "12",
      photo: 'https://i5.walmartimages.com/asr/0356b49b-c267-47d6-ae95-90ffd5f04dd3.04bd5f00a1b61facc1275b771e11b4e7.jpeg?odnHeight=612&odnWidth=612&odnBg=FFFFFF',
      catagoryId: 1
  },
  {
      title: "Shower Beer Holder",
      description: 'Nice rubber holder to hold your favorite shower beverage',
      price: "5",
      invQty: "41",
      photo: 'https://flipfit-cdn.akamaized.net/flipfit-prod-tmp/items/1660475893183-090335380GRYOS.webp',
      catagoryId: 2
  },
  {
      title: "Bigfoot Air Freshner",
      description: 'For when you have that new car smell that needs to smell like a locker room.',
      price: "23",
      invQty: "1",
      photo: 'https://i.etsystatic.com/16245580/r/il/483c9c/3161775434/il_794xN.3161775434_qj1h.jpg',
      catagoryId: 1
  },
  ]
  const products = await Promise.all(
    productsToCreate.map((products) => createProduct(products))
  )
  // console.log("Products Created: ", products)
  console.log("Finished creating products.")
}

async function createInitialReviews() {
  console.log("starting to create reviews...")

  const reviewToCreate = [
    {
      productId: 1,
      userId: 1,
      title: 'Retread Works',
      review: 'It really worked to retread my bald tires. I stopped sliding in the rain'
    },
    {
        productId: 1,
        userId: 1,
        title: 'Retread Works',
        review: 'It really worked to retread my bald tires. I stopped sliding in the rain'
    },
    {
        productId: 1,
        userId: 1,
        title: 'Retread Works',
        review: 'It really worked to retread my bald tires. I stopped sliding in the rain'
    },
    {
        productId: 1,
        userId: 1,
        title: 'Retread Works',
        review: 'It really worked to retread my bald tires. I stopped sliding in the rain'
    },
    
  ]
  const reviewscreated = await Promise.all(
    reviewToCreate.map(createReview)
  )

  // console.log(reviewToCreate)
  // console.log("Review created: ", reviewcreated)
  console.log("Finished creating reviews!")
}


async function rebuildDB() {
  try {
    client.connect()
    await dropTables()
    await createTables()
    // await createInitialUsers()
    // await createInitialCatagory()
    // await createInitialProducts()
    // await createInitialReviews()
    console.log('testing area')
    // console.log(await getProductById(1))
    
console.log('Rebuild Complete')
  } catch (error) {
    console.log("Error during rebuildDB")
    throw error
  }
}



module.exports = {
  rebuildDB,
  dropTables,
  createTables,
}