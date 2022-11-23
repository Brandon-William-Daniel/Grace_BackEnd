// Reviews -- Brandon
//         getAllReviewsByProduct
//         getAllReviewsByUser
//         updateReview
//         destroyReview
//         createReview

const client = require('./client')

async function getAllReviewsByProduct () {
      try {
         const { rows: results } = await client.query(`
         SELECT review.*, products.product as "review"
         FROM reviews JOIN
         products ON reviews."productId"=product.Id`) 
      } catch (error) {
         console.log(error)
      }
}

async function getAllReviewsByUser (username) {
     try {
        const { rows: results } = await client.query(`
        SELECT reviews.*, users.username as "userName"
        FROM reviews JOIN
        users ON reviews."userId"=user.Id
        WHERE username=$1
        `, [username])

        return results
     } catch (error) {
        console.log(error)
     }
}

async function updateReview(title, description) {
     const setString = Object.keys(description).map(
        (key, index) => `"${key}"=$${index + 1}`
     ).join(', ');

     try {
        if (setString.length > 0) {
          const {rows: [reviews] } = await client.query(`
          UPDATE reviews
          SET ${setString}
          WHERE title=${title}
          RETURNING *;
          `, Object.values(description))

          return reviews;
        }
     } catch (error) {
        console.log(error)
     }
}

async function deleteReview(productId, userId) {
     try {
        const results = await client.query(`
        DELETE FROM reviews
        WHERE "productId"=${productId} and "userId"=${userId};
        `)
     } catch (error) {
        console.log(error)
     }
}

async function createReview({productId, userId, title, description}){
     try {
        const results = await client.query(`
        INSERT INTO reviews ("productId", "userId", title, description)
        VALUES ($1, $2, $3, $4)
        RETURNING *;
        `, [productId, userId, title, description])
        return results
     } catch (error) {
        console.log(error)
     }
}

module.exports = {
   getAllReviewsByProduct,
   getAllReviewsByUser,
   updateReview,
   deleteReview, 
   createReview
}