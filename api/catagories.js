const express = require('express')
const catagoriesRouter = express.Router()
const {createCatagory} = require('../db/catagories')
const {requireUser} = require('./utils')

catagoriesRouter.post('/newcatagory', requireUser, async (req, res) => {
    const {catName} = req.body
    const catData = {}
    try {
        catData.catName = catName
        const newCatagory = await createCatagory(catData)
        if(newCatagory){
            res.send({newCatagory})
        }else{
            res.send({
                name: 'FaileToCreateCatagoryError',
                message: 'Something went wrong with creating the new catagory try again later.'
            })
        }
    } catch (error) {
        console.error(error.detail)
    }
})

module.exports = catagoriesRouter;