// Products -- Daniel
//         createProduct // done
//         getProductById //done
//         getProductByCatagory //done
//         getAllProducts //done
//         destroyProduct // done
//         updateProduct //done
//         addProductToCart
//         buySingleProductNow

const client = require('./client')

async function createProduct({title, description, price, invQty, catagoryId, active}){
    try {
        const result = await client.query(`
            INSERT INTO products (title, description, price, invQty, "catagoryId", active)
            VALUES ($1, $2, $3, $4, $5, $6)
            RETURNING *;
        `, [title, description, price, invQty, catagoryId, active])
        return result
    } catch (error) {
        console.error(error.detail)
    }
}


async function getProductById(id){
    try {
        const {rows: [product]} = await client.query(`
            SELECT title, description, price
            FROM products
            WHERE id=${id};
        `)
        return product
    } catch (error) {
        console.error(error.detail)
    }
}


async function getProductByCatagory(catagoryId){
    try {
        const {rows} = await client.query(`
            SELECT title, description, price
            FROM products
            WHERE "catagoryId"=${catagoryId};
        `)
        return rows
    } catch (error) {
        console.error(error.detail)
    }
}

async function getAllProducts(){
    try {
        const {rows} = await client.query(`
            SELECT title, description, price
            from products;
        `)
        return rows
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


async function updateProduct({id, title, description, price, invQty, catagoryId}){
    try {
        const result = await client.query(`
            UPDATE products
            SET title=$1,
                description=$2,
                price=$3,
                invQty=$4,
                "catagoryId"=$5
            WHERE id=${id}
            RETURNING *;
        `, [title, description, price, invQty, catagoryId])
        return result
    } catch (error) {
        console.error(error.detail)
    }
}

async function addProductToCart({productId, userId, total, current, shipTo}){
    //
    try {
        const {rows} = await client.query(`
           INSERT INTO "orderLine" ("productId", "userId", total, current, "shipTo")
           VALUES ($1, $2, $3, $4, $5)
           RETURNING *;
       `, [productId, userId, total, current, shipTo])
        return rows
    } catch (error) {
        console.error(error.detail)
    }
}

async function buySingleProductNow({orderId, productId, quantity, price}){
    try {
        const result = await client.query(`
           INSERT INTO "orderDetails" ( "orderId", "productId", quantity, price)
           VALUES ($1, $2, $3, $4)
           RETURNING *
        `, [orderId, productId, quantity, price])
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
    getProductByCatagory,
    getProductById,
    addProductToCart
}