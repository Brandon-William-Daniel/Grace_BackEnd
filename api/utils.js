function requireUser(req, res, next) {
  if (!req.user) {
    next({
      name: "MissingUserError",
      message: "You must be logged in to complete this task!",
    });
  }
  next();
}

//Matt: In addition to requireUser, you may need a requireAdmin
// middleware to protect some rourtes

module.exports = {
  requireUser,
};
