function requireUser(req, res, next){
    if(!req.user){
        next({
            name: "MissingUserError",
            message: "You must be logged in to complete this task!"
        })
    }
    next()
}

function adminUser(req, res, next){
    if(!req.user.isAdmin && !req.user){
        next({
            name: "MissingAdminError",
            message: "You must be an admin to use this feature"
        })
    }
    next()
}

module.exports = {
    requireUser,
    adminUser
}

