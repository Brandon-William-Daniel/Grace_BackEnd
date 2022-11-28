// Users --William
//         POST -- /register Create New User
//         POST -- /login Login User
//         GET -- /me Verified the user. Getting everything for the logged in user
//         GET -- /:username/orders Pull everything for this user

const express = require('express');
const usersRouter = express.Router();
const { 
    getUserByUsername, 
    createUser, 
    getAllUsers, 
     } = require('../db/users');
const bcrypt  = require("bcrypt");
const jwt = require('jsonwebtoken');

// POST /api/users/register

usersRouter.post('/register', async (req, res, next) => {
    // console.log('made it to api')
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
        
    console.log(user)
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
        //Can Probably Use getUser func
        const user = await getUserByUsername(username);
    
        const hashedPassword = user.password;
        const isValid = await bcrypt.compare(password, hashedPassword)
        if (user && isValid) {
          // create token & return to user
          const token = jwt.sign({id: user.id, 
            username: username 
          }, process.env.JWT_SECRET, {
            expiresIn: '1w'});
        //   console.log({message: `Thank you for logging in ${username}`, token: token })
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

usersRouter.get('/me', async (req, res, next) => {
    const {username} = req.body;
    console.log(username)
    try {
    const user = await getUserByUsername(username)
    console.log('/me', user)
   res.send(user)
    } catch ({ name, message }) {
      next({ name, message })
    } 
    }

);

// Get /api/users/:username/orders

usersRouter.get('/:username/orders', async (req, res, next) => {
    const {username} = req.params.username;
    console.log(username)
    try {
    const user = await getUserByUsername(username)
    console.log('/me', user)
   res.send(user)
    } catch ({ name, message }) {
      next({ name, message })
    } 
    }

)



module.exports = usersRouter;