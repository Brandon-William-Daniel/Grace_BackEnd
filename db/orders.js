
const client = require('./client')


async function updateDetails(did, uid, {quantity}, price) {
   
    try {
      
         const {rows: [reviews] } = await client.query(`
         UPDATE "orderDetails"
         SET quantity= $1, price= $2
         WHERE "id"=${did} AND "userId"=${uid}
         RETURNING *;
         `, [quantity, price])

         return reviews;
       
    } catch (error) {
       console.log(error)
    }
}

async function deleteDetails(detailId, userId) {
    try {
       const results = await client.query(`
       DELETE FROM "orderDetails"
       WHERE "id"=${detailId} and "userId"=${userId}
       RETURNING * ;

       WHERE "productId"=${detailId} and "userId"=${userId};

       `)
       console.log('deleted')
    } catch (error) {
       console.log(error)
    }
}

async function getDetailById(id){

    try {
        const {rows: [detail]} = await client.query(`
            SELECT *
            FROM "orderDetails"
            WHERE id=${id};
        `)

        return detail
    } catch (error) {
        console.error(error)
    }
}

async function createCart(userId, total, shipTo){
    try {
        const {rows:[cat]} = await client.query(`
            INSERT INTO "orderLine" ("userId", total, "shipTo")
            VALUES ($1, $2, $3)
            RETURNING *;
        `, [userId, total, shipTo])
      
        return cat
    } catch (error) {
        console.error(error)
    }
}

async function joinDetailsToCart(userId){
    try {

    const {rows:[cart]} = await client.query(`
        SELECT *
        FROM "orderLine"
        WHERE "userId" = $1
        AND "orderLine".current = true;
        `, [userId])

    const {rows: products} = await client.query(`
        SELECT products.*, "orderDetails".price, "orderDetails".quantity
        FROM "orderDetails"
        LEFT JOIN "products"
        ON "orderDetails"."productId" = products.id 
        WHERE "orderDetails"."cartId" = $1;
        `, [cart.cartId])
    
        cart.products=products

        return cart
    } catch (error) {
        console.error(error)
    }
}

async function pastCart(userId){
    try {

    const {rows:{cart}} = await client.query(`
        SELECT *
        FROM "orderLine"
        WHERE "userId" = $1
        AND "orderLine".current = false;
        `, [userId])
    if (!cart){
        return null
    }
    const {rows: products} = await client.query(`
        SELECT products.*, "orderDetails".price, "orderDetails".quantity
        FROM "orderDetails"
        LEFT JOIN "products"
        ON "orderDetails"."productId" = products.id 
        WHERE "orderDetails"."cartId" = $1;
        `, [cart.cartId])
    
        cart.products=products

        return cart
        
    } catch (error) {
        console.error(error)
    }
}

async function getCartById(cartId){

    try {
        const {rows: [cart]} = await client.query(`
            SELECT *
            FROM "orderLine"
            WHERE "cartId"=${cartId} AND current = true;
        `)

        return cart
    } catch (error) {
        console.error(error)
    }
}

async function getCartByUserId(userId){

    try {
        const {rows: [cart]} = await client.query(`
            SELECT *
            FROM "orderLine"
            WHERE "userId"=${userId} AND current = true;
        `)

        return cart
    } catch (error) {
        console.error(error)
    }
}

async function purchaseCart(cartId, userId) {
    try {
       const results = await client.query(`
        UPDATE "orderLine"
        SET current = false
        WHERE "cartId"=${cartId} and "userId"=${userId}
        RETURNING * ;
        `)
       console.log('deleted')
    } catch (error) {
       console.log(error)
    }
}

async function changeCartAddress(cartId, userId, address) {
    try {
       const {rows: [results]} = await client.query(`
        UPDATE "orderLine"
        SET "shipTo" = $1
        WHERE "cartId"=${cartId} and "userId"=${userId}
        RETURNING * ;
        `,[address])
       return results
    } catch (error) {
       console.log(error)
    }
}

async function updateTotal(userId){
    const cart = await joinDetailsToCart(userId)
    const products = cart.products
    // console.log('products', products)
    let total = 0
    products.map(el => total =+ el.price + total)
    try {
        const {rows:[updateTotal]} = await client.query(`
            UPDATE "orderLine"
            SET total = $1
            WHERE "cartId" = ${cart.cartId} and "userId" = ${userId}
            RETURNING *;
        `, [total])
      
        return updateTotal
    } catch (error) {
        console.error(error)
    }
}
module.exports = {

    updateDetails,
    getDetailById,
    createCart,
    joinDetailsToCart,
    getCartById,
    pastCart,
    deleteDetails,
    purchaseCart,
    changeCartAddress,
    updateTotal,
    getCartByUserId
}