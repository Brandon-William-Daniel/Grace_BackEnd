// Orders -- Cade
// clearCart
// subtractFromQtyByProductId
// removeItem
// updateOrder

const client = require('./client')

async function getCartContents(orderid) {
    try {
        const {rows: [order]} = await client.query(`
        SELECT * 
        FROM order
        WHERE id=${orderid}
        `)
        return order
    } catch (error) {
        console.error(error.detail)
    }
}


async function clearCart(orderId) {
    try {
        const result = await client.query(`
            DELETE * FROM order
            WHERE id=${orderId}
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


module.exports = {
    clearCart,
    updateOrder,
    removeItem,
    subtractFromQtyByProductId,
    getCartContents
}