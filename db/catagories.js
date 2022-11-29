const client = require("./client");

async function createCatagory({ catName }) {
  try {
    const result = await client.query(
      `
            INSERT INTO catagory ("catName")
            VALUES ($1)
            RETURNING *
        `,
      [catName]
    );
    return result;
  } catch (error) {
    // Matt: You may want to return the error here so
    // you can use it in the api
    console.error(error.detail);
  }
}

module.exports = {
  createCatagory,
};
