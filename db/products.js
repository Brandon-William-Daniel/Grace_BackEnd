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

async function createProduct({title, description, price, invQty, photo, catagoryId}){
    try {
        const {rows: [products]} = await client.query(`
            INSERT INTO products (title, description, price, "invQty", photo, "catagoryId")
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


async function getProductById(productId){

    try {
        const {rows: [products]} = await client.query(`
            SELECT *
            FROM products
            WHERE id=${productId};
        `)

        return products
    } catch (error) {
        console.error(error)
    }
}


async function getProductByCatagory(catagoryId){
    try {
        const {rows: results} = await client.query(`
            SELECT *
            FROM products
            WHERE "catagoryId"=${catagoryId};
        `)
        console.log(results)
        return results
    } catch (error) {
        console.error(error.detail)
    }
}

async function getAllProducts(){
    try {


        const {rows} = await client.query(`
            SELECT *
            from products;
        `)
        return rows
    } catch (error) {
        console.error(error)
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


async function updateProduct(productid, {...fields}){
    
    const setString = Object.keys(fields).map(
        (key, index) => `"${ key }"=$${ index + 1 }`
      ).join(', ');
    console.log('setString', setString)
      // return if no fields
      if (setString.length === 0) {
    
        return;
      }
    
      try {
       
        const  {rows:[result]}  = await client.query(`
          UPDATE products
          SET ${setString}
          WHERE id=${ productid }
          RETURNING *;
        `, Object.values(fields));
    
        return result;
      } catch (error) {
        console.log(error)
        throw error;
      }
    
    }

async function createOrderDetail({productId, cartId, userId, quantity, price}){
    
    try {
        const {rows: [results]} = await client.query(`
           INSERT INTO "orderDetails" ("productId", "cartId", "userId", quantity, price)
           VALUES ($1, $2, $3, $4, $5)
           RETURNING *;
       `, [productId, cartId, userId, quantity, price])
        return results
    } catch (error) {
        console.log(error)
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
    createOrderDetail,
    createCatagory
}