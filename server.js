//~~~~~~~~~~~~~~~~~~~~REQUIRE STATEMENT~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//

require('dotenv').config();
const express = require('express');
const layouts = require('express-ejs-layouts');
const session = require('express-session')
const passport = require('./config/ppConfig')
const flash = require('connect-flash')
const isLoggedIn = require('./middleware/isLoggedIn')
const axios = require('axios')
//const fs = require("fs") //uncomment to use local JSON data if API crashes
const app = express();


//~~~~~~~~~~~~~~~~~~~~MIDDLEWARE~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//

app.set('view engine', 'ejs');

app.use(require('morgan')('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(express.static(__dirname + '/public'));
app.use(layouts);

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
}))

app.use(flash())


app.use(passport.initialize())
app.use(passport.session())

app.use((req, res, next) => {
  res.locals.alerts = req.flash();                                          
  res.locals.currentUser = req.user;                                        
  next();                                                                   
});

//~~~~~~~~~~~~~~~~~~~~ROUTES~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//

app.get('/', (req, res) => {                                                
  res.render('index');                                                     
});


//ROUTE FOR USE TO POPULATE CONTENT USING LOCAL DATA (localPlants.json) - Use if the API crashes
// app.get('/main', isLoggedIn, (req, res) => {                           
//   const importLocalPlants = fs.readFileSync('./localPlants.json')
//   const twentyPlants = JSON.parse(importLocalPlants)
//   res.render('main', {plants: twentyPlants})
// })

//ROUTE FOR USE TO POPULATE CONTENT USING API (trefle.io)
app.get('/main', isLoggedIn, (req, res) => {                                
  const plantApiUrl=`http://trefle.io/api/v1/plants?token=${process.env.TREFLE_API_KEY}` 
    axios.get(plantApiUrl).then(function(apiResponse){
      const plants = apiResponse.data.data               
      res.render('main', {apiPlants: plants})       
    })
})


//~~~~~~~~~~~~~~~~~~~~IMPORTED ROUTES~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//

app.use('/auth', require('./routes/auth'));
app.use('/ledger', require('./routes/ledger'))
app.use('/cemetery', require('./routes/cemetery'))
app.use('/details', require('./routes/details'))


//~~~~~~~~~~~~~~~~~~~~LISTENING ON...~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//

var server = app.listen(process.env.PORT || 1031, ()=> console.log(`🎧You're listening to the smooth sounds of port ${process.env.PORT || 1031}🎧`));

module.exports = server;
