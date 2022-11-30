// Orders -- Cade
// clearCart
// subtractFromQtyByProductId
// removeItem
// updateOrder

const client = require('./client')

// async function getCartContents() {
//     try {
//         const {rows: [order]} = await client.query(`
//         SELECT * 
//         FROM "orderLine"
//         WHERE active=true
//         `)
//         return order
//     } catch (error) {
//         console.error(error.detail)
//     }
// }


async function clearCart(orderId) {
    try {
        const result = await client.query(`
            DELETE * FROM order
            WHERE id=${orderId};
        `)
    } catch (error) {
        console.error(error.detail)
    }
}

async function removeItem(orderId, userid){
    try {
        const result = await client.query(`
            DELETE FROM order
            WHERE "orderid=${orderId} and "userid=${userid};
        `)
        console.log('removed')
    } catch (error) {
        console.error(error.detail)
    }
}

async function updateOrder(orderid, userid){
    try {
        const result = await client.query(`
        UPDATE order
        WHERE "orderid=${orderid} and "userid=${userid};
        `)
    } catch (error) {
        onsole.error(error.detail)
    }
}

async function subtractFromQtyByProductId(orderid, productid, qty ){
    try {
        const result = await client.query(`

        `)
    } catch (error) {
        
    }
}

async function addDetailToOrderLine ({detailId, userId, price}){
    console.log('detail to orderline')
    try {
        const {rows: [order]} = await client.query(`
            INSERT INTO "orderLine" ("detailId", "userId", total)
            VALUES ($1, $2, $3)
            RETURNING *;
        `, [detailId, userId, price])
        console.log('order', order)
        return order
    } catch (error) {
        console.log(error)
        console.error(error.detail)
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

async function createCart(userId){
    try {
        const {rows:[cat]} = await client.query(`
            INSERT INTO "orderLine" ("userId")
            VALUES ($1)
            RETURNING *;
        `, [userId])
      
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

async function getCartById(userId){

    try {
        const {rows: [cart]} = await client.query(`
            SELECT *
            FROM "orderLine"
            WHERE "cartId"=${userId} AND current = true;
        `)

        return cart
    } catch (error) {
        console.error(error)
    }
}




module.exports = {
    clearCart,
    updateOrder,
    removeItem,
    subtractFromQtyByProductId,
    // getCartContents,
    addDetailToOrderLine,
    getDetailById,
    createCart,
    joinDetailsToCart,
    getCartById
}



// Cart----
//    -- Detail1
//    -- detail2
//    -- detail3
// Cart Total Price