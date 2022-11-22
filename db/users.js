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
async function createUser( {username, password, email, address, isAdmin }) {
  const hashedPassword = await bcrypt.hash(password, 10);
  try{
      const {rows: [users]} = await client.query(`
          INSERT INTO users(username, password, email, address, "isAdmin")
          VALUES ($1,$2,$3,$4,$5)
          RETURNING id, username, email, address; 
      `,[username, hashedPassword, email, address, isAdmin])
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

module.exports = {
    createUser,
    // getUser,
    getUserById,
    getUserByUsername
  }