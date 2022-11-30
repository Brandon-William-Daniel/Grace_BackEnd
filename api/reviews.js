const express = require('express')
const reviewRouter = express.Router();
const {getAllReviews, 
    createReview, 
    deleteReview, 
    updateReview,
    getAllReviewsByProduct} = require('../db/reviews')

const {requireUser} = require('./utils');

//GET /api/reviews/

reviewRouter.get('/:productId', async (req, res, next) => {
    const productId = req.params.productId
    // console.log(productId)
    try {
        // const allReviews = await getAllReviews();
        const allReviews = await getAllReviewsByProduct(productId)
console.log(allReviews)
        res.send({
            allReviews
        })
    } catch (error) {
        console.log(error)
    }
})

// POST /api/reviews/:productId/newreview

reviewRouter.post('/:productId/newreview', requireUser, async (req, res, next) => {
    const {title, description} = req.body
    // console.log('this is the params', req.params.productId)
    const reviewData = {}

    try {
        reviewData.productId = req.params.productId
        reviewData.userId = req.user.id
        reviewData.title = title
        reviewData.description = description
        const createdReview = await createReview(reviewData)
        if(createdReview){
            res.send({createdReview})
        } else {
            res.send({
                name: "FailedToCreateReview",
                message: "Unable to create Review"
            })
        }
    } catch (error) {
        console.log(error)
    }
})

//DELETE /api/reviews/deletereview/:productId/:userId

reviewRouter.delete('/deletereview/:productId/:userId', requireUser, async (req, res, next) => {
    const productId = req.params.productId;
    const userId = req.params.userId;

    try {
        const deletedReview = await deleteReview(productId, userId)
        // const allReviews = await getAllReviewsByProduct(productId);
        res.send('Succesfully Deleted')
    } catch (error) {
        console.log(error)
    }
})

//PATCH /api/reviews/updateReview/:productId/:userId

reviewRouter.patch('/updateReview/:productId/:userId', requireUser, async (req, res, next) => {
    const productId = req.params.productId;
    const userId = req.params.userId;
    const {title, description} = req.body
console.log(userId)
    const updateFields = {};

    if (title) {
        updateFields.title = title;
      }
    
      if (description) {
        updateFields.description = description;
      }

    try {
        if(userId == req.user.id){
        const updatedReview = await updateReview(productId, userId, updateFields)
        res.send({
            updatedReview
        })
        }else{
            next({
                name: 'Unauthorized User',
                message: 'You cannone update a review that is not yours'
            })
        }

    } catch (error) {
        console.log(error)
    }
})

module.exports = reviewRouter;