// Products -- Daniel
//         createProduct // done
//         getProductById //done
//         getProductByCatagory //done
//         getAllProducts //done
//         destroyProduct // done
//         updateProduct //done
//         addProductToCart
//         buySingleProductNow

const client = require("./client");

async function createProduct({title, description, price, invQty, photo,catagoryId}){
    try {
        const {rows: [products]} = await client.query(`
            INSERT INTO products (title, description, price, invQty, photo, "catagoryId")
            VALUES ($1, $2, $3, $4, $5, $6)
            RETURNING *;
        `, [title, description, price, invQty, photo, catagoryId])
        // console.log(products)
        return products
    } catch (error) {
        console.error(error)
    }
}

async function createCatagory({name}){
    try {
        const {rows:[cat]} = await client.query(`
            INSERT INTO catagory ("catName")
            VALUES ($1)
            RETURNING *;
        `, [name])
      
        return cat
    } catch (error) {
        console.error(error)
    }
}


async function getProductById(id){
    try {
        const {rows: [products]} = await client.query(`
            SELECT title, description, price
            FROM products
            WHERE id=${id};
        `)
      
        return products
    } catch (error) {
        console.error(error)
    }
}


async function getProdcutByCatagory(catagory){
    try {
        const result = await client.query(`
            SELECT title, description, price
            FROM products
            WHERE "catName"=${catagory};
        `)
        return result
    } catch (error) {
        console.error(error.detail)
    }
}

async function getAllProducts(){
    try {
        const result = await client.query(`
            SELECT *
            from products;
        `)
        return result
    } catch (error) {
        console.error(error.detail)
    }
}

async function destroyProduct(productId){
    try {
        const result = await client.query(`
            DELETE FROM products
            WHERE id=${productId};
        `)
    } catch (error) {
        console.error(error.detail)
    }
}


async function updateProduct({productId, title, description, price, invQty, catagoryId}){
    try {
        const result = await client.query(`
            UPDATE products
            SET title=$1
                description=$2
                price=$3
                invQty=$4
                "catagoryId"=$5
            WHERE id=${productId}
            RETURNING *;
        `, [title, description, price, invQty, catagoryId])
    } catch (error) {
        console.error(error.detail)
    }
}

async function addProductToCart({productId, userId, shipTo}){
    try {
        const result = await client.query(`
            INSERT INTO "orderLine"
            VALUES ($1)
            WHERE "prodcutId"=${productId}
            AND
            WHERE "userId"=${userId}
        `, [shipTo])
    } catch (error) {
        console.error(error.detail)
    }
}

async function buySingleProductNow({productId, quanity, price}){
    try {
        const result = await client.query(`
            INSERT INTO "orderDetails"
            VALUES ($1, $2)
            WHERE "productId"=${productId}
        `, [quanity, price])
    } catch (error) {
        console.error(error.deatil)
    }
}
module.exports = {
    createProduct,
    buySingleProductNow,
    updateProduct,
    destroyProduct,
    getAllProducts,
    getProdcutByCatagory,
    getProductById,
    addProductToCart,
    createCatagory
}