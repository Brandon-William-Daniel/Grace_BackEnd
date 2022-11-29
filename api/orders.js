// Orders -- Cade
// POST -- /
// GET -- / View Cart must match userID
// DELETE -- Remove the item from cart

const express = require('express')
const ordersRouter = express.Router()
const { getCartContents } = require('../db/orders')
const { createOrderDetail, getProductById } = require ("../db/products")
const { requireUser } = require('./utils')

ordersRouter.get('/', requireUser, async (req, res, next) => {
    try {
        const cart = await getCartContents();
        res.send({
            cart
        })
    } catch (error) {
        console.log(error)
    }
})


ordersRouter.delete('/removefromcart/:orderid/:userid', requireUser, async (req, res, next) => {
    const orderid = req.params.orderid
    const userid = req.params.userid
    try {
        const removefromcart = await removefromcart(orderid, userid)
        res.send('Removed')
    } catch (error) {
        console.log(error)
    }
})

//POST /api/orders/orderdetails

ordersRouter.post('/orderdetails/:productId', requireUser, async (req, res, next) => {
    const productId = req.params.productId
 console.log(productId)
    const {quantity} = req.body
    const productData = {}
    try {

      productData.productId = productId
      const pid = await getProductById(productId)
      console.log(pid.price)
      productData.price = pid.price * quantity
      productData.quantity = quantity
     
      const addToCart = await createOrderDetail(productData)
      console.log(addToCart)
      if(addToCart){
        res.send(addToCart)
      }else{
        res.send({
            name: 'FailedToAddToCart',
            message: 'Something went wrong when adding to cart. Try again later'
        })
      }
    } catch (error) {
        console.error(error.detail)
    }
})

module.exports = ordersRouter;