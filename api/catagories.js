const express = require('express')
const catagoriesRouter = express.Router()
const {createCatagory, getAllCatagories} = require('../db/catagories')
const {requireUser, adminUser} = require('./utils')

//POST /api/catagories/newcatagory

catagoriesRouter.post('/newcatagory', adminUser,  async (req, res) => {
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

catagoriesRouter.get('/', async (req, res) => {
    try {
        const cat = await getAllCatagories()
        res.send({
            cat
        })
    } catch (error) {
        console.log(error)
    }
})
module.exports = catagoriesRouter;