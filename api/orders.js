
const express = require('express')
const ordersRouter = express.Router()
const { joinDetailsToCart, 
    getDetailById, 
    getCartById, 
    updateDetails, 
    pastCart, 
    deleteDetails, 
    purchaseCart, 
    createCart, 
    changeCartAddress, 
    updateTotal, 
    getCartByUserId } = require('../db/orders')
const { createOrderDetail, getProductById } = require ("../db/products")
const { requireUser } = require('./utils')

//GET /api/orders/viewcart

ordersRouter.get('/viewcart', requireUser, async (req, res, next) => {
    const userId = req.user.id
   
    try {
        const cart = await joinDetailsToCart(userId);
        res.send({
            cart
        })
    } catch (error) {
        console.log(error)
        console.error(error.detail)
    }
})

//GET /api/orders/pastcart

ordersRouter.get('/pastcart', requireUser, async (req, res, next) => {
    const userId = 1 //req.user.id
    
    try {
        const cart = await pastCart(userId);
        res.send({
            cart
    })
    } catch (error) {

        console.error(error.detail)
    }
})

//POST /api/orders/orderdetails/:productId

ordersRouter.post('/orderdetails/:productId', requireUser, async (req, res, next) => {
    const productId = req.params.productId
    const {quantity} = req.body
    const userId = req.user.id
    // console.log(userId)
    const productData = {}
    try {
      productData.productId = productId
    //   console.log(productId)
      const cartId = await getCartById(userId)
    //   console.log(userId)
      console.log(cartId)
      productData.cartId = cartId.cartId
      productData.userId = userId
      const pid = await getProductById(productId)
      productData.price = pid.price * quantity
      productData.quantity = quantity
     
      const addToCart = await createOrderDetail(productData)
      const total = await updateTotal(userId)

      if(addToCart){
        res.send(addToCart)
      }else{
        res.send({
            name: 'FailedToCreateDetail',
            message: 'Something went wrong when creating detail. Try again later'
        })
      }
    } catch (error) {
        console.log(error)
        console.error(error.detail)
    }
})

// PATCH orderDetails update Quantity for an item and return it to orderLine

ordersRouter.patch('/update/:detailId', requireUser, async (req, res, next) => {
    const detailId = req.params.detailId;
    console.log(detailId)
    const {quantity} = req.body
    // console.log(req.user.id)
    const userId = req.user.id
    const detail = await getDetailById(detailId, userId)
    console.log(detail)
    
    const pid = await getProductById(detailId)
    // console.log(pid)
    const price = pid.price * quantity    
      console.log('price', price)
    try {
        if(userId == req.user.id){
        const updatedQuantity = await updateDetails(detailId, userId, {quantity}, price)
        const total = await updateTotal(userId)
        res.send({
            updatedQuantity
        })
        }else{
            next({
                name: 'Unauthorized User',
                message: 'You cant change quantity'
            })
        }

    } catch (error) {
        console.log(error)
    }
})

// DELETE /api/orders/:detailId orderDetails removes an item from the cart
ordersRouter.delete('/detail/:detailId', requireUser, async (req, res, next) => {
    const detailId = req.params.detailId
    const userId = req.user.id
    
    try {
        const removefromcart = await deleteDetails(detailId, userId)

        const total = await updateTotal(userId)
        res.send('Removed')

    } catch (error) {
        console.log(error)
    }
})

// DELETE /cart/:cartId orderLine sets current to false and creates a new cart

ordersRouter.delete('/cart/:cartId', requireUser, async (req, res, next) => {
    const detailId = req.params.cartId
    const userId = req.user.id
    const shipTo = req.user.address
    console.log(req.user)
    try {
        const total = await updateTotal(userId)

        const purchase = await purchaseCart(detailId, userId);
        console.log('th', purchase)

        const create = await createCart(userId, 0, shipTo)
        console.log('new', create)
        if(create){
        res.send('Purchase Complete')
        }
    } catch (error) {
        console.log(error)
    }
})


//PATCH /updateAddress/:cartId orderLine update address

ordersRouter.patch('/updateAddress/:cartId', requireUser, async (req, res, next) => {
    const cartId = req.params.cartId;
    const {address} = req.body
    const cartById = await getCartById(cartId)
    const userId = cartById.userId

    try {
        if(userId == req.user.id){
        const updatedReview = await changeCartAddress(cartId, userId, address)
        res.send({
            updatedReview
        })
        }else{
            next({
                name: 'Unauthorized User',
                message: 'You cannont update cart that is not yours'
            })
        }

    } catch (error) {
        console.log(error)
    }
})


module.exports = ordersRouter;