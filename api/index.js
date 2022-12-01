const express = require('express');
const router = express.Router();

const jwt = require('jsonwebtoken');
const { getUserById } = require('../db');
const { JWT_SECRET } = process.env;


router.use(async (req, res, next) => {
  const prefix = 'Bearer ';
  const auth = req.header('Authorization');
  
  if (!auth) { 
    next();
  } else if (auth.startsWith(prefix)) {
    const token = auth.slice(prefix.length);
    
    try {
      const parsedToken = jwt.verify(token, JWT_SECRET);
      
      const id = parsedToken && parsedToken.id
      if (id) {
        req.user = await getUserById(id);
        next();
      }
    } catch (error) {
      next(error);
    }
  } else {
    next({
      name: 'AuthorizationHeaderError',
      message: `Authorization token must start with ${ prefix }`
    });
  }
});

router.use((req, res, next) => {
    if (req.user) {
      // console.log("User is set:", req.user);
    }
  
    next();
  });


// ROUTER: /api/users
const usersRouter = require('./users');
router.use('/users', usersRouter);

// ROUTER: /api/products
const productsRouter = require('./products');
router.use('/products', productsRouter);

const catagoriesRouter = require('./catagories')
router.use('/catagories', catagoriesRouter);

// ROUTER: /api/orders
const ordersRouter = require('./orders');
router.use('/orders', ordersRouter);

// ROUTER: /api/routine_activities
const reviewRouter = require('./reviews');
router.use('/reviews', reviewRouter);

router.use((error, req, res, next) => {
    res.send({
      name: error.name,
      message: error.message
    });
  });

module.exports = router;