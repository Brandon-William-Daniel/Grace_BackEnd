
const express = require('express');
const usersRouter = express.Router();
const { 
    getUserByUsername, 
    createUser, 
    getAllUsers,
    getUserById,
    creditInfo,
    makeAdmin 
     } = require('../db/users');
const {requireUser, adminUser} = require('./utils');

const bcrypt  = require("bcrypt");
const jwt = require('jsonwebtoken');
const crypto = require ("crypto");
const algorithm = "aes-256-cbc";
const initVector = crypto.randomBytes(16);
const Securitykey = crypto.randomBytes(32);
    
    



// POST /api/users/register

usersRouter.post('/register', async (req, res, next) => {
   const { username, password, email, address} = req.body;
    try {
      const userExists = await getUserByUsername(username);
  
      if (userExists) {
        next({
          name: 'UserExistsError',
          message: 'That Username already exists'
        });
      }
  
      const user = await createUser({
        username,
        password,
        email,
        address
      });
      
      const token = jwt.sign({id: user.id, 
        username: username 
      }, process.env.JWT_SECRET, {
        expiresIn: '1w'});
  
      res.send({ 
        user,
        message: "You are ready to start shopping with us",
        token 
      });
    } catch ({ name, message }) {
      next({ name, message })
    } 
  });

//POST api/users/login

usersRouter.post('/login', async (req, res, next) => {
    const { username, password } = req.body;
    
  if (!username || !password) {
    next({
      name: "MissingCredentialsError",
      message: "Please supply both a username and password"
    });
  }

  try {

    const user = await getUserByUsername(username);

    const hashedPassword = user.password;
    const isValid = await bcrypt.compare(password, hashedPassword)
    if (user && isValid) {
      // create token & return to user
      const token = jwt.sign({id: user.id, 
        username: username 
      }, process.env.JWT_SECRET, {
        expiresIn: '1w'});
    
        res.send({ message: `Thank you for logging in ${username}`, token: token });
    } else {
      next({ 
        name: 'IncorrectCredentialsError', 
        message: 'Username or password is incorrect'
      });
    }
  } catch(error) {
    console.log(error);
    next(error);
  }
});
  
// GET /api/users/me

usersRouter.get('/me', requireUser, async (req, res, next) => {
    const userId = req.user.id
    try {
    const user = await getUserById(userId)
  
   if(user.creditCard){
    console.log('here')
    const decipher = crypto.createDecipheriv(algorithm, Securitykey, initVector);
   const ccInfo = user.creditCard
    
  let encryptedCreditCard = decipher.update(ccInfo, "hex", "utf-8");
  encryptedCreditCard += decipher.final("utf-8");

  user.creditCard = encryptedCreditCard.slice(-4)
    }
console.log('decrypted user', user)
   res.send(user)

    } catch ({ name, message }) {
      next({ name, message })
    } 
    }

);

//POST /api/users/credit

usersRouter.post('/credit', requireUser, async (req, res, next) => {
  const creditCard = req.body.creditCard
  const userId = req.user.id

  if(creditCard.length > 16)
    res.send({
      name: "TooLong",
      message: 'Credit Card information is more than 16 digits'})
  
  else if(creditCard.length < 16)
    res.send({
      name: "TooShort",
      message: "Credit Card information is less than 16 digits"})
 
  else { try {
    //encryption
    
    
    const cipher = crypto.createCipheriv(algorithm, Securitykey, initVector);
    let ccEncrypt = cipher.update(creditCard, "utf-8", "hex");
    
    ccEncrypt += cipher.final("hex");

     const results = await creditInfo(userId, ccEncrypt)

    if(results.id != userId)
    res.send({
      message:'Cannot complete at this time'
    })
  res.send(
    results)

  } catch ({ name, message }) {
    next({ name, message })
  } }
}
);

// GET /api/users/admin

usersRouter.get('/admin', adminUser, async (req, res, next) => {
  const userId = req.user.id
  try {
  const users = await getAllUsers(userId)
 
 res.send(users)

  } catch ({ name, message }) {
    next({ name, message })
  } 
  }

);

//PATCH /api/users/isadmin/:userId

usersRouter.patch('/isadmin/:userId', adminUser, async (req, res, next) => {
  const userId = req.params.userId
  const boolean = req.body. boolean
  
  try {
  const user = await makeAdmin(userId, boolean)
 
 res.send(user)

  } catch ({ name, message }) {
    next({ name, message })
  } 
  }

);

module.exports = usersRouter;


// let decryptedData = decipher.update(ccEncrypt, "hex", "utf-8");

// decryptedData += decipher.final("utf8");

// console.log("Decrypted message: " + decryptedData);