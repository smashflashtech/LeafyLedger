//TO DO: REQUIRE STATEMENTS
var express = require('express');   // - express
const db = require('../models')     // - DB
var router = express.Router();      // - express router
// - method override


//TO DO: GET /ledger - return a page with favorited plants
//TO DO: - Get all records from the leafy_ledger database and render to view

//TO DO: POST /ledger - receive name of plant, scientific name, picture URL, and API index integer and add it to the database (use hidden form data)
//TO DO: - Get form data and add new record to the DB
router.post('/', (req, res) => {
  console.log("This is: ", req.body.userId)
  db.user.findOrCreate({
    where: {userId: req.body.userId}
  }).then(function ([returnedUser, created]) {
    console.log("This is 2nd: ", req.body.name)
    console.log("User created?:", created)
    //console.log("This is the data:", returnedUser)
    db.plant.findOrCreate({
      where: { 
        apiId: req.body.apiId,
        name: req.body.name,
        scientificName: req.body.scientificName,
        lastWatered: "",
        pictureUrl: req.body.pictureUrl,
      }
    }).then(function (plant) {
    returnedUser.addPlant(plant).then(function (userInfo) {
    console.log(projectInfo)
      })
    })
  })
    .then((user) => {
      res.redirect('/')                                 //promises to redirect back to the home page
    })
    .catch((error) => {                                 //displays error if one occurs 
      //console.log(error)
      res.status(400).render('main/404')
    })
})






//TO DO: ADD A ROUTE FOR DELETING USING METHOD OVERRIDE ON THE POST ROUTE for deleting a plant form the database (the delete buttton is on the 'ledger.ejs')

//TO DO: export the router
module.exports = router;
