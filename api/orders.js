// Orders -- Cade
// POST -- /
// GET -- / View Cart must match userID
// DELETE -- Remove the item from cart

const express = require('express')
const ordersRouter = express.Router()
const { joinDetailsToCart,addDetailToOrderLine, getDetailById, getCartById } = require('../db/orders')
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

// current set to false create a new cart for that user. createCartFunction
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

//POST /api/orders/orderdetails/:productId

ordersRouter.post('/orderdetails/:productId', requireUser, async (req, res, next) => {
    const productId = req.params.productId
    const {quantity} = req.body
    const userId = req.user.id
    const productData = {}
    try {
      productData.productId = productId
      const cartId = await getCartById(userId)
    //   console.log(cartId)
      productData.cartId = cartId.cartId
      productData.userId = userId
      const pid = await getProductById(productId)
      productData.price = pid.price * quantity
      productData.quantity = quantity
     
      const addToCart = await createOrderDetail(productData)

      if(addToCart){
        res.send(addToCart)
      }else{
        res.send({
            name: 'FailedToCreateDetail',
            message: 'Something went wrong when creating detail. Try again later'
        })
      }
    } catch (error) {
        console.error(error.detail)
    }
})

//GET /api/orders/viewcart

ordersRouter.get('/viewcart', async (req, res, next) => {
    const userId = req.user.id
    console.log(userId)
    try {
        const cart = await joinDetailsToCart(userId);
        res.send({
            cart
        })
    } catch (error) {
        console.error(error.detail)
    }
})

//POST /api/orders/:detailId/addtocart ADD DETAIL TO ORDER

// ordersRouter.post('/addtocart/:detailId/addtocart', requireUser, async (req, res, next) => {
//     const detailId = req.params.detailId
//     // const cartId = req.params.cartId
//     // const {quantity} = req.body
//     const cartData = {}
//     try {
//         const detail = await getCartById(req.user.id)
//         console.log(detail)
//       cartData.detailId = detailId
//     //   const pid = await getProductById(productId)
//       cartData.price = detail.price //+ currentCartPrice
//       cartData.userId = req.user.id
     
//       const addToCart = await addDetailToOrderLine(cartData)
//       console.log('addtocart', addToCart)

//       if(addToCart){
//         res.send(addToCart)
//       }else{
//         res.send({
//             name: 'FailedToAddToCart',
//             message: 'Something went wrong when adding to cart. Try again later'
//         })
//       }
//     } catch (error) {
//         console.error(error.detail)
//     }
// })

module.exports = ordersRouter;