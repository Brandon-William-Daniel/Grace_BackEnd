// Orders -- Cade
// POST -- /
// GET -- / View Cart must match userID
// DELETE -- Remove the item from cart

const express = require('express')
const orderRouter = express.Router()
const { getCartContents } = require('../db/orders')
const { requireUser } = require('./utils')

orderRouter.get('/', requireUser, async (req, res, next) => {
    try {
        const cart = await getCartContents();
        res.send({
            cart
        })
    } catch (error) {
        console.log(error)
    }
})


orderRouter.delete('/removefromcart/:orderid/:userid', requireUser, async (req, res, next) => {
    const orderid = req.params.orderid
    const userid = req.params.userid
    try {
        const removefromcart = await removefromcart(orderid, userid)
        res.send('Removed')
    } catch (error) {
        console.log(error)
    }
})

module.exports = ordderRouter;