// Users -- William
//         createUser
//         getUserById
//         getUserByUsername
//         getAllUsers --Admins to see all users 
//         getUserInfo-- collects all info for a logged in user

const client = require("./client");
const  bcrypt  = require("bcrypt");
const { createCart } = require("./orders");
// const { getAllRoutinesByUser } = require("./routines");


// user functions

async function createUser( {username, password, email, address, isAdmin}) {
  const hashedPassword = await bcrypt.hash(password, 10);
  try{
      const {rows: [users]} = await client.query(`
          INSERT INTO users(username, password, email, address, "isAdmin")
          VALUES ($1,$2,$3,$4,$5)
          RETURNING id, username, email, address, "isAdmin"; 
      `,[username, hashedPassword, email, address, isAdmin])
    //  console.log(users)
    const userId = users.id
    await createCart(userId, 0, address)
      return users
    }catch(error){
      console.log(error)
    }
}


async function getUserById(userId) {
    try {
      const { rows: [user] } = await client.query(`
        SELECT id, username, email, address, "isAdmin", "creditCard"
        FROM users
        WHERE id=$1
      `, [userId]);

      if (!user) {
        return null
      }
  
      return user;
    } catch (error) {
      throw error;
    }
  }

  async function getAllUsers() {
    
    try {
      //select username from user table
      const {rows} = await client.query(`
      SELECT id, username, email, "isAdmin", address
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

  async function getOrderLineByUserId(userId){
    try {
      const { rows: [order] } = await client.query(`
        SELECT *
        FROM "orderLine"
        WHERE "userId" = $1 AND active = true;
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

  async function creditInfo(userId, creditCard) {
    try{
        const {rows: [results]} = await client.query(`
            UPDATE users
            SET "creditCard" = $1
            WHERE "id" = ${userId}
            RETURNING id, username, email, address, "isAdmin", "creditCard"; 
        `,[creditCard]) 
        return results
      }catch(error){
        console.log(error)
      }
  }

  async function makeAdmin(userId, boolean) {
    try{
        const {rows: [results]} = await client.query(`
            UPDATE users
            SET "isAdmin" = $1
            WHERE "id" = ${userId}
            RETURNING id, username, "isAdmin"; 
        `,[boolean]) 
        return results
      }catch(error){
        console.log(error)
      }
  }

  

module.exports = {
    createUser,
    getAllUsers,
    getUserById,
    getUserByUsername,
    getOrderLineByUserId,
    creditInfo,
    makeAdmin

  }