// Reviews -- Brandon
//         POST -- /:product/review Post a review
//         GET -- /:product/
//         DELETE --/:product/delete removes the review from the post Must match userId
//         PATCH -- /:product/update Updates review Must match userId

const express = require('express')
const reviewRouter = express.Router();
const {getAllReviews, 
    createReview, 
    deleteReview, 
    updateReview,
    getAllReviewsByProduct} = require('../db/reviews')

const {requireUser} = require('./utils');

reviewRouter.get('/', async (req, res, next) => {
    try {
        const allReviews = await getAllReviews();

        res.send({
            allReviews
        })
    } catch (error) {
        console.log(error)
    }
})
// POST /api/reviews/3/newreview
reviewRouter.post('/:productId/newreview', requireUser, async (req, res, next) => {
    const {title, review} = req.body
    // console.log('this is the params', req.params.productId)
    const reviewData = {}

    try {
        reviewData.productId = req.params.productId
        reviewData.userId = req.user.id
        reviewData.title = title
        reviewData.review = review
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