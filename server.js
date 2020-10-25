const twentyPlants = [
  {
    common_name: 'Evergreen oak',
    scientific_name: 'Quercus rotundifolia',
    image_url: 'https://bs.floristic.org/image/o/1a03948baf0300da25558c2448f086d39b41ca30',
    dead: false,
    apiId: '678281'
  },
  {
    common_name: 'Stinging nettle',
    scientific_name: 'Urtica dioica',
    image_url: 'https://bs.floristic.org/image/o/85256a1c2c098e254fefe05040626a4df49ce248',
    dead: false,
    apiId: '190500'
  },
  {
    common_name: 'Orchardgrass',
    scientific_name: 'Dactylis glomerata',
    image_url: 'https://bs.floristic.org/image/o/05c2f3cf28a921235daece7b31806741c7251784',
    dead: false,
    apiId: '126957'
  },
  {
    common_name: 'Common yarrow',
    scientific_name: 'Achillea millefolium',
    image_url: 'https://bs.floristic.org/image/o/d8bdcc8a8328551e6e6ce50129e8e7a871b6b3a5',
    dead: false,
    apiId: '101913'
  },
  {
    common_name: 'Narrowleaf plantain',
    scientific_name: 'Plantago lanceolata',
    image_url: 'https://bs.floristic.org/image/o/78a8374f009e6ed2dc71ca17d18e4271ea0a2a7b',
    dead: false,
    apiId: '167888'
  },
  {
    common_name: 'English oak',
    scientific_name: 'Quercus robur',
    image_url: 'https://bs.floristic.org/image/o/2292b670683abdaac354389514105df0018d9ef8',
    dead: false,
    apiId: '173327'
  },
  {
    common_name: 'Red fescue',
    scientific_name: 'Festuca rubra',
    image_url: 'https://bs.floristic.org/image/o/2292b670683abdaac354389514105df0018d9ef8',
    dead: false,
    apiId: '137025'
  },
  {
    common_name: 'Creeping buttercup',
    scientific_name: 'Ranunculus repens',
    image_url: 'https://bs.floristic.org/image/o/c6d9a5222b6ef0e3a7bdef3350278718d3097bce',
    dead: false,
    apiId: '173910'
  },
  {
    common_name: 'Common velvetgrass',
    scientific_name: 'Holcus lanatus',
    image_url: 'https://bs.floristic.org/image/o/46619775d4319328b2fad6f1ba876ccca2d03534',
    dead: false,
    apiId: '143075'
  },
  {
    common_name: 'White clover',
    scientific_name: 'Trifolium repens',
    image_url: 'https://bs.floristic.org/image/o/c766ed84c547abac6021244bc0014d665ba7726f',
    dead: false,
    apiId: '189539'
  },
  {
    common_name: 'European ash',
    scientific_name: 'Fraxinus excelsior',
    image_url: 'https://bs.floristic.org/image/o/84ef20b0276c3e0a6d32dd97a7b987b510feb961',
    dead: false,
    apiId: '137834'
  },
  {
    common_name: 'Oneseed hawthorn',
    scientific_name: 'Crataegus monogyna',
    image_url: 'https://bs.floristic.org/image/o/f3ca7a240ea7d0f6c011a3259f783c7b82f10dc8',
    dead: false,
    apiId: '124198'
  },
  {
    common_name: 'Red clover',
    scientific_name: 'Trifolium pratense',
    image_url: 'https://bs.floristic.org/image/o/7eb243363838c9975c57204057e63fa8101c26d8',
    dead: false,
    apiId: '189529'
  },
  {
    common_name: 'Tall buttercup',
    scientific_name: 'Ranunculus acris',
    image_url: 'https://bs.floristic.org/image/o/8390d605e1947cb44e24af9492f96df4a34e8ca8',
    dead: false,
    apiId: '173587'
  },
  {
    common_name: 'Common filbert',
    scientific_name: 'Corylus avellana',
    image_url: 'https://bs.floristic.org/image/o/0d92cadb0d66dce1b0a8b26913125d6501e31d68',
    dead: false,
    apiId: '123486'
  },
  {
    common_name: 'European beech',
    scientific_name: 'Fagus sylvatica',
    image_url: 'https://bs.floristic.org/image/o/a733221df31a1ff99af03566841744f3b4c6cffe',
    dead: false,
    apiId: '136773'
  },
  {
    common_name: 'Common rush',
    scientific_name: 'Juncus effusus',
    image_url: 'https://bs.floristic.org/image/o/bab95d74bfaeb9f6a736cf35d048e46cc6624d50',
    dead: false,
    apiId: '146208'
  },  {
    common_name: 'Garden sorrel',
    scientific_name: 'Rumex acetosa',
    image_url: 'https://bs.floristic.org/image/o/780b9f3c63318588b8874d608c2d4900fc2adce3',
    dead: false,
    apiId: '176845'
  },  {
    common_name: 'Sweet vernalgrass',
    scientific_name: 'Anthoxanthum odoratum',
    image_url: 'https://bs.floristic.org/image/o/fcf64ef0676db8ca9d2abf4017f5b8211b10e0b1',
    dead: false,
    apiId: '105790'
  },  {
    common_name: 'Queen of the meadow',
    scientific_name: 'Filipendula ulmaria',
    image_url: 'https://bs.floristic.org/image/o/168ee7151e03184eaa0ae4d4ed31f8a0131e39f6',
    dead: false,
    apiId: '137183' 
  },
]

//~~~~~~~~~~~~~~~~~~~~REQUIRE STATMENT~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//

require('dotenv').config();
const express = require('express');
const layouts = require('express-ejs-layouts');
const session = require('express-session')
const passport = require('./config/ppConfig')
const flash = require('connect-flash')
const isLoggedIn = require('./middleware/isLoggedIn')
const axios = require('axios')
const app = express();


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
// // --This code was accessing the API, API is down--
// app.get('/main', isLoggedIn, (req, res) => {                                //this is rendering the profile page (views/profile.ejs)
//   //console.log("Whats up my ninjas")
//   const plantApiUrl=`http://trefle.io/api/v1/plants?token=${process.env.TREFLE_API_KEY}` //use a request to call the API
//     axios.get(plantApiUrl).then(function(apiResponse){
// //      console.log(apiResponse.data.links)// bookmarking this data for later in case it has to do with pagination      
// //      console.log(apiResponse.data.data)
// //      console.log(apiResponse.data.data.length)         //this array returns 20 plants...seems like JS might be able to get away without json parsing
//       const twentyPlants = apiResponse.data               //store desired API repsonse data in in a variable
//       res.render('main', {apiPlants: twentyPlants})       //res.render to the 'main' page with a context variable that contains API data - API has its own limiter and uses pagination.. need to read the pagination docs to get more plants
//     })
// })

//ROUTE FOR USE WHILE THE API IS DOWN
app.get('/main', isLoggedIn, (req, res) => {                                //this is rendering the profile page (views/profile.ejs)
  console.log('What up my ninjas')
  res.render('main', {plants: twentyPlants})       //res.render to the 'main' page with a context variable that contains API data - API has its own limiter and uses pagination.. need to read the pagination docs to get more plants
})

//TO DO: GET route by params to query the API for info on one plant and send to the details.ejs


//~~~~~~~~~~~~~~~~~~~~ROUTES~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
app.use('/auth', require('./routes/auth'));
//TO DO: ADD IMPORT FOR NEW ROUTES
app.use('/ledger', require('./routes/ledger'))

var server = app.listen(process.env.PORT || 1031, ()=> console.log(`🎧You're listening to the smooth sounds of port ${process.env.PORT || 1031}🎧`));

module.exports = server;
