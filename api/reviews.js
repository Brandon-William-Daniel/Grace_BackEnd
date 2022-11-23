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
    updateReview} = require('../db/reviews')

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

reviewRouter.post('/:productId/newreview', requireUser, async (req, res, next) => {
    const {title, review} = req.body
    console.log('this is the params', req.params.productId)
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

reviewRouter.delete('/deletereview/:productid/userid', requireUser, async (req, res, next) => {
    const {productId, userId} = req.params;

    try {
        const deletedReview = await deleteReview(productId, userId)
        const allReviews = await getAllReviews();
        res.send({
            allReviews
        })
    } catch (error) {
        console.log(error)
    }
})

reviewRouter.patch('/updateReview/:productid/:userid', requireUser, async (req, res, next) => {
    const {productId, userId} = req.params
    const {title, description} = req.body

    try {
        const updatedReview = await updateReview({productId, userId})
        res.send({
            updatedReview
        })
    } catch (error) {
        console.log(error)
    }
})

module.exports = reviewRouter;