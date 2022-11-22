// Products -- Daniel
//         createProduct // done
//         getProductById //done
//         getProductByCatagory //done
//         getAllProducts //done
//         destroyProduct // done
//         updateProduct //done
//         addProductToCart
//         buySingleProductNow

const { ClientRequest } = require('http')
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
        const result = await client.query(`
            SELECT title, description, price
            FROM products
            WHERE id=${id};
        `)
        return result
    } catch (error) {
        console.error(error.detail)
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

async function addProductToCart({}){
    try {
        const result = await client.query(`
            INSERT INTO "orderLine"
            VALUES ()


        `)
    } catch (error) {
        console.error(error.detail)
    }
}

async function buySingleProductNow({productId, quanity, price}){
    try {
        const result = await client.query(`
            INSERT INTO "orderDetails"
            VALUES ($1, $2)
            WHERE 'productId'=${productId}
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
    getProductById
}