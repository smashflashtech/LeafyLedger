const express = require('express');
const db = require('../models')
const passport = require('../config/ppConfig')
const router = express.Router();

router.get('/signup', (req, res) => {
  res.render('auth/signup');
});

//create a signup POST route
router.post('/signup', (req, res) =>  {
  //finding or creaing a user, given their name, password, and email
  db.user.findOrCreate({
    where: {email: req.body.email},
    defaults: {
      name: req.body.name,
      password: req.body.password,
    }
  }).then(([user, created]) => {
    //if created, this means success and we can redirect to home
    if (created) { //AUTHORIZING FLASH BLOCK ONE
//      console.log (`${user.name} was created!`) //delete this line FLASH
      passport.authenticate('local', {
        successRedirect: '/',
        successFlash: 'Account created and user logged in.' //added this line FLASH
      })(req, res) //make sure the request body and response is sucessfully pass to the home page... this looks weird and thats ok... we call this block of cold an immediately invoked function expression or IFFE ("iffy")
    } else { //SECOND FLASH BLOCK
      //if not created, the email already exists
     //console.log("Email already exists.")//delete this FLASH
      req.flash('error', 'Email already exists')//Add this FLASH
      res.redirect('/auth/login')
    } //THIRD BLOCK FLASH 
  }).catch(error => { //"graceful error handling" catch and error, see what error is and send them to an error page
    //if an error occurs lets see the error
    req.flash('error', error.message)//ADD THIS FLASH
    //console.log(`An error occured: ${error.message}`)//DELETE THIS FLASH
    res.redirect('/auth/signup')
  })
})
//you want to be taking note of the concepts behind a long hairy function like this.. what are the big decisions we are makaing inside of this signup funciton to make sure it is handling the users process of signining up in a way that makes sense and pushes them in the right places they need to be
// - when it does well it redirects them to home
// - when they already have an email they send them back to a logon
// - if theres an error message thhen we send them back to the sign up page to try again

router.get('/login', (req, res) => {
  res.render('auth/login');
});

router.post('/login', passport.authenticate('local', { //instead of the callback function with req was run passport.authenticate( strategy, {objectWithACoupleRedirectUrls})
  successRedirect: '/',                                //this is that object
  failureRedirect: '/auth/login',
  failureFlash: 'Invalid username or password', //ADD FLASH
  successFlash: 'You have logged in!',          //ADD FLASH
})) 

router.get('/logout', (req, res) => {
  req.logout()
  req.flash('success', 'You have logged out.') //ADD FLASH
  res.redirect('/')
})

module.exports = router;
