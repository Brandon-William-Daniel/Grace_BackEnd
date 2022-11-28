<<<<<<< HEAD
function requireUser(req, res, next) {
    if (!req.user) {
      next({
        name: "MissingUserError",
        message: "You must be logged in to perform this action"
      });
    }
    
    next();
  }
  
  module.exports = {
    requireUser
  }
=======

function requireUser(req, res, next){
    if(!req.user){
        next({
            name: "MissingUserError",
            message: "You must be logged in to complete this task!"
        })
    }
    next()
}

module.exports = {
    requireUser
}

>>>>>>> 8fc3fcacd7895ce48ae39f74cd1f01aabb64742b
