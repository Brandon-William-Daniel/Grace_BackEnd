// Products -- Daniel
// POST -- /createProduct Only Admin
// GET -- / Get active products
// DELETE -- /setInactive Set post to active
// PATCH --/updateProduct Update Current Product

const express = require('express');
const productsRouter = express.Router();
const {getAllProducts, createProduct, destroyProduct, updateProduct, getProductById} = require('../db/products')
const {requireUser, adminUser} = require('./utils');

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

//POST /api/products/newproduct

productsRouter.post('/newproduct', adminUser, async (req, res, next) => {
    const {title, description, price, invQty, photo, catagoryId} = req.body
    const productData = {}
    try {
      productData.title = title
      productData.description = description
      productData.price = price
      productData.invQty = invQty
      productData.photo = photo
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

//DELETE api/products/deleteproduct/:productid

productsRouter.delete('/deleteproduct/:productid', adminUser, async (req, res) => {
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

//PATCH /api/products/updateproduct/:productid

productsRouter.patch('/updateproduct/:productid', adminUser, async (req, res) => {
    const {productid} = req.params
    const {title, description, price, invQty, catagoryId} = req.body
    const updateFields = {}

    if (title) {
        updateFields.title = title;
      }
    
    if (description) {
        updateFields.description = description;
      }
  
    if (price) {
          updateFields.price = price;
        }

    if (invQty) {
            updateFields.invQty = invQty;
          }
      
    if (catagoryId) {
              updateFields.catagoryId = catagoryId;
            }
    try {
        const updatedProduct = await updateProduct(productid, updateFields)
        console.log('this is updated', updatedProduct)
        if(updatedProduct){
            console.log('you have updated the product')
            res.send({
                updatedProduct
            })
        }else{
            console.log('failed to update product')
        }
    } catch (error) {
        console.error(error.detail)
    }
})

productsRouter.get("/:productId", async (req, res) => {
    const {productId} = req.params
    console.log(productId)
      try {
          const product = await getProductById(productId)
          res.send({
              product
          })
      } catch (error) {
          console.error(error.detail)
      }
  })


module.exports = productsRouter;