const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy //working with a class 
const db = require('../models')

// Passport "serializes" objects to make them easy to store, converting the user to an identifier (id)
//first time they login
passport.serializeUser((user, cb) => { //callback function, first argument is a user, cb (call back variable) argument is something the passport automatically passes into the function
  cb(null, user.id)                    //check passport documentation for what this does if youre interested...its okay if yo dont underestand what everything does.. but if you dont undestand thats ok, this documentation is supposed to make it easier--you can just use it as you should withotu knowing how it works
})

/*everytime they login after that
 * Passport "deserializes" objects by taking the user's serialization (id)
 * and looking it up in the database
 *
 */
passport.deserializeUser((id, cb) => { //cb stands for call back variable
  db.user.findByPk(id).then(user => { //this is where we connect to the database, it compares the database ID to the user Id
    cb(null, user)
  }).catch(cb) //handling errors
})

/*
 * This is Passport's strategy to provide local authentication. We provide the
 * following information to the LocalStrategy:
 *
 * Configuration: An object of data to identify our authentication fields, the
 * username and password
 *
 * Callback function: A function that's called to log the user in. We can pass
 * the email and password to a database query, and return the appropriate
 * information in the callback. Think of "cb" as a function that'll later look
 * like this:
 *
 * login(error, user) {
 *   // do stuff
 * }
 *
 * We need to provide the error as the first argument, and the user as the
 * second argument. We can provide "null" if there's no error, or "false" if
 * there's no user.
 */

passport.use(new LocalStrategy({
  usernameField: 'email',   //these keys are predefined values that you cannot change--the value can change eg name instead of email.. but the key cannot..it is expected by passport
  passwordField: 'password',//cannot change this key
}, (email, password, cb) => {
  db.user.findOne({                                 //find a user in the database
    where: { email }                                //using their email (instead of writing email: email, object property shorthand--when the key of our object is the same as the variable represnting some value are the same name/word.. you can eliminate the colon and write in the value).. so { email: email } = {email} 
  }).then (user => {                                //promises call back that returns the user information to us
    if (!user || !user.validPassword(password)) {   //if theres no users or the password is wrong, cb(null, false)..password came form the callback on line 46
                      //.validPassword() was a function we wrote when we created the model for bcrypt
      cb(null, user)                                //its trying to log our user in login(error, user){ do stuff }
    } else {
      cb(null, user)                                //its going to try to log the user in with cb(null, user)
    }
  }).catch(cb) 
}))





module.exports = passport; 