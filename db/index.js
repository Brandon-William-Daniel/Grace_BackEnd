module.exports = {
    
    ...require('./users'), // adds key/values from users.js
    ...require('./orders'), // adds key/values from activites.js
    ...require('./products'), // etc
    ...require('./reviews') // etc
  }