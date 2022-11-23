const client = require('./client')

async function createCatagory({catName}){
    try {
        const result = await client.query(`
            INSERT INTO catagory ("catName")
            VALUES ($1)
            RETURNING *
        `, [catName])
        return result
    } catch (error) {
        console.error(error.detail)
    }
}

module.exports = {
    createCatagory
}
