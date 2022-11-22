// Users -- William
//         createUser
//         getUserById
//         getUserByUsername
//         getAllUsers --Admins to see all users 
//         getUserInfo-- collects all info for a logged in user

const client = require("./client");
const  bcrypt  = require("bcrypt");
// const { getAllRoutinesByUser } = require("./routines");


// user functions
async function createUser( {username, password }) {
  const hashedPassword = await bcrypt.hash(password, 10);
  try{
      const {rows: [users]} = await client.query(`
          INSERT INTO users(username, password)
          VALUES ($1,$2)
          RETURNING id, username; 
      `,[username, hashedPassword])
     
      return users
    }catch(error){
      console.log(error)
    }
}

module.exports = {
    createUser,
    // getUser,
    // getUserById,
    // getUserByUserName
  }