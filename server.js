require('dotenv').config();
const express = require('express');
const layouts = require('express-ejs-layouts');
const session = require('express-session')
const passport = require('./config/ppConfig')
const flash = require('connect-flash')
const isLoggedIn = require('./middleware/isLoggedIn')
const app = express();
//require axios - install axios too

//~~~~~~~~~~~~~~~~~~~~MIDDLEWARE~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
app.set('view engine', 'ejs');

app.use(require('morgan')('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(express.static(__dirname + '/public'));
app.use(layouts);

app.use(session({
  secret: process.env.SESSION_SECRET,                                       //session_secret is a pizza variable name
  resave: false,
  saveUninitialized: true,
}))
//                                                                          //*********SESSION SHOULD ALWAYS BE ABOVE THESE LINES OF CODE below */
app.use(flash())

//                                                                          //*********SESSION SHOULD ALWAYS BE ABOVE THESE LINES OF CODE below */
app.use(passport.initialize())
app.use(passport.session())

app.use((req, res, next) => {
// before every route, attach the flash messages and current user to res.locals
  res.locals.alerts = req.flash();                                          //req.flash is added by the two middleware we place above
  res.locals.currentUser = req.user;                                        //this user property is added to each request by session and passport
  next();                                                                   //next is a function that will make sure the user is push through to the next route
});

//~~~~~~~~~~~~~~~~~~~~ROUTES~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//

app.get('/', (req, res) => {                                                //this is rendering the login page (views/index.ejs inside the template layout.ejs)
  res.render('index');                                                      //layout.ejs determines whether or not a signup/login is displayed or lougout/profile is displayed
});
//PRIORITIZE THIS
app.get('/main', isLoggedIn, (req, res) => {                                //this is rendering the profile page (views/profile.ejs)
//TODO: use a request to call the API
//  store desired API repsonse data in in a variable
// res.render to the 'main' page with a context variable that contains API data - consider using .slice(startIndex, endIndex) to set API limit -- 1 million is a lot of plants to display
});

//TO DO: GET route by params to query the API for info on one plant and send to the details.ejs


//~~~~~~~~~~~~~~~~~~~~ROUTES~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
app.use('/auth', require('./routes/auth'));
//TO DO: ADD IMPORT FOR NEW ROUTES


var server = app.listen(process.env.PORT || 1031, ()=> console.log(`🎧You're listening to the smooth sounds of port ${process.env.PORT || 1031}🎧`));

module.exports = server;
