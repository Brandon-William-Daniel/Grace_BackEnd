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
async function createUser( {username, password, email, address}) {
  const hashedPassword = await bcrypt.hash(password, 10);
  try{
      const {rows: [users]} = await client.query(`
          INSERT INTO users(username, password, email, address)
          VALUES ($1,$2,$3,$4)
          RETURNING id, username, email, address; 
      `,[username, hashedPassword, email, address])
    //  console.log(users)
      return users
    }catch(error){
      console.log(error)
    }
}

async function getUserById(userId) {
    try {
      const { rows: [user] } = await client.query(`
        SELECT *
        FROM users
        WHERE id=$1
      `, [userId]);
     //currently returning password
      if (!user) {
        return null
      }
  
      // user.routines = await getAllRoutinesByUser(user.username);
  
      return user;
    } catch (error) {
      throw error;
    }
  }

  async function getAllUsers() {
    
    try {
      //select username from user table
      const {rows} = await client.query(`
      SELECT id, username, email, "isAdmin"
      FROM users
      `);
    //   console.log(rows)
      return rows
    } catch (error) {
      return error;
    }
  }  

  async function getUserByUsername(username) {
    // console.log('userbyusername', username)
    try {
      const { rows: [user] } = await client.query(`
        SELECT *
        FROM users
        WHERE username = $1;
      `, [username]);
  
      if (!user) {
        return null
      }
  
     
  // console.log('getUserByUserName: ', user)
      return user;
    } catch (error) {
      throw error;
    }
  }

  //getUsersInfo -- Need other functions to complete. May put on API

module.exports = {
    createUser,
    getAllUsers,
    getUserById,
    getUserByUsername
  }