// Products -- Daniel
//         createProduct // done
//         getProductById //done
//         getProductByCatagory //done
//         getAllProducts //done
//         destroyProduct
//         updateProduct
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
        const result = await client.query(`
            SELECT title, description, price
            FROM products
            WHERE id=${id}
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
            WHERE "catName"=${catagory}
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
            from prodcuts
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
            WHERE id=${productId}
        `)
    } catch (error) {
        console.error(error.detail)
    }
}


module.exports = {
    createProduct
}