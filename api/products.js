// Products -- Daniel
// POST -- /createProduct Only Admin
// GET -- / Get active products
// DELETE -- /setInactive Set post to active
// PATCH --/updateProduct Update Current Product

const express = require('express');
const productsRouter = express.Router();
const {getAllProducts, createProduct, destroyProduct, updateProduct} = require('../db/products')

// productsRouter.use((req, res, next) => {
//     console.log('a request is being made to products')
//     next();
// })

// GET /api/products/
productsRouter.get('/', async (req, res, next) => {
    try {
        const products = await getAllProducts();
        res.send({
            products
        })
    } catch (error) {
        console.error(error.detail)
    }
})

productsRouter.post('/newproduct', async (req, res, next) => {
    const {title, description, price, invQty, catagoryId} = req.body
    const productData = {}
    try {
      productData.title = title
      productData.description = description
      productData.price = price
      productData.invQty = invQty
      productData.catagoryId = catagoryId
      const newProduct = await createProduct(productData)
      if(newProduct){
        res.send({newProduct})
      }else{
        res.send({
            name: 'FailedToCreateProductError',
            message: 'Something went wrong with creating the post. Try again later'
        })
      }
    } catch (error) {
        console.error(error.detail)
    }
})

productsRouter.delete('/deleteproduct/:productid', async (req, res) => {
    const {productid} = req.params
    try {
        const deleteproduct = await destroyProduct(productid)
        if(deleteproduct){
           console.log('Deleted product successfull')
        } 
        const products = await getAllProducts();
        res.send({
            products
        })
    } catch (error) {
        console.error(error.detail)
    }
})

productsRouter.patch('/updateproduct/:productid', async (req, res) => {
    const {productid} = req.params
    const {title, description, price, invQty, catagoryId} = req.body
    try {
        const updatedProduct = await updateProduct({id: productid, title, description, price, invQty, catagoryId})
        if(updatedProduct){
            console.log('you have updated the product')
            res.send({
                updatedProduct
            })
        }else{
            console.log('failed to update post')
        }
    } catch (error) {
        console.error(error.detail)
    }
})



module.exports = productsRouter;