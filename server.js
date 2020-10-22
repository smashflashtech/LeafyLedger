require('dotenv').config();
const express = require('express');
const layouts = require('express-ejs-layouts');
const session = require('express-session')
const passport = require('./config/ppConfig')
const flash = require('connect-flash')
const isLoggedIn = require('./middleware/isLoggedIn')
const app = express();

app.set('view engine', 'ejs');

app.use(require('morgan')('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(express.static(__dirname + '/public'));
app.use(layouts);

app.use(session({
  secret: process.env.SESSION_SECRET, //session_secret is a pizza variable name
  resave: false,
  saveUninitialized: true,
}))
//*********SESSION SHOULD ALWAYS BE ABOVE THESE LINES OF CODE below */
app.use(flash())

//*********SESSION SHOULD ALWAYS BE ABOVE THESE LINES OF CODE below */
app.use(passport.initialize())
app.use(passport.session())

//next is a function that will just push a .. through to the next function variable - HAD A TYPPO SOMEWHERE
// app.use(req, resp, next) => {
//   //before every route, attach the flash messages and currentuser to res.locales - an object that stores
//   res.locals.alerts=req.flash() //req.flash is added by the two middleware we place above
//   res.locals.currentUser = req.user //this user property is added to each request by session and passport
// })
app.use((req, res, next) => {
  // before every route, attach the flash messages and current user to res.locals
  res.locals.alerts = req.flash();
  res.locals.currentUser = req.user;
  next();
});

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/profile', isLoggedIn, (req, res) => {
  res.render('profile');
});

app.use('/auth', require('./routes/auth'));

var server = app.listen(process.env.PORT || 3000, ()=> console.log(`🎧You're listening to the smooth sounds of port ${process.env.PORT || 3000}🎧`));

module.exports = server;
