// Orders -- Cade
// POST -- /
// GET -- / View Cart must match userID
// DELETE -- Remove the item from cart

const express = require('express')
const ordersRouter = express.Router()
const { getCartContents,addDetailToOrderLine, getDetailById } = require('../db/orders')
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
    const productData = {}
    try {
      productData.productId = productId
      productData.userId = req.user.id
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

//POST /api/orders/:detailId/:cartId ADD DETAIL TO ORDER

// ordersRouter.post('/addtocart/:detailId', requireUser, async (req, res, next) => {
//     const detailId = req.params.detailId
//     // const cartId = req.params.cartId
//     // const {quantity} = req.body
//     const cartData = {}
//     try {
//         const detail = await getDetailById(detailId)
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