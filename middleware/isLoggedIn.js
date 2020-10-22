//define a function and immediately export that function
module.exports = (req, res, next) => {
  if (!req.user) {
    req.flash('error', 'You must be logged in to access that page.')
    //putting up walls against people accessing pages without being logged in
    res.redirect('/auth/login')
  } else {
    next() //ensures when a user passes through this middleware that this user gets pushed on down to the next routes we've set up
  }
}