const express = require('express');
const db = require('../models')
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
    if (created) {
      console.log (`${user.name} was created!`)
      res.redirect('/')
    } else {
      //if not created, the email already exists
      console.log("Email already exists.")
      res.redirect('/auth/login')
    }
  }).catch(error => { //"graceful error handling" catch and error, see what error is and send them to an error page
    //if an error occurs lets see the error
    console.log(`An error occured: ${error.message}`)
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

module.exports = router;
