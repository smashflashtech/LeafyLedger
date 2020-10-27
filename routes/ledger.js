//TO DO: REQUIRE STATEMENTS
const express = require('express');   // - express
const db = require('../models')     // - DB
const router = express.Router();      // - express router
const isLoggedIn = require('../middleware/isLoggedIn');
// - method override
const methodOverride = require("method-override")

router.use(methodOverride("_method"))

//TO DO: GET /ledger - return a page with favorited plants
//TO DO: - Get all records from the leafy_ledger database and render to view
router.get("/", isLoggedIn, function(req, res) {
  console.log("==============================")
    req.user.getPlants({
      where: {
        status: "alive"
      }
    }
    ).then(function(alivePlants){
    console.log(alivePlants)
    res.render("ledger", { plants: alivePlants})
  }) 
})


//ROUTE to POST NEW PLANT to DB and JOIN User and PLANT
router.post('/', (req, res) => {
  //console.log("This is IT: ", req.body)
  db.user.findOrCreate({
    where: { id: parseInt(req.body.userId) }
  }).then(function ([returnedUser, created]) {
    // console.log("THIS IS THE USER~~~~~~~~~", returnedUser.name, created)
    db.plant.findOrCreate({
      where: {
        common_name: req.body.common_name,
        scientific_name: req.body.scientific_name,
        image_url: req.body.image_url,
        apiId: req.body.apiId,
        lastWatered: req.body.lastWatered,
        status: req.body.status,
      }
  }).then(function (newPlant) {
    // console.log("YOU HAVE ARRIVE!!!!!!!!!)")
    // console.log("NEW PLANT:", newPlant[0].id)
    // console.log("RETURNED USER:", returnedUser.name)
    returnedUser.addPlant(newPlant[0].id).then(function(userInfo) {
    // console.log(newPlant[0].common_name, "WAS CREATED~~~~~~~~~~~**")
    })
  })
})
  .then((returnedUser) => {
    res.redirect('/ledger')                                 //promises to redirect back to the ledger
  })
    .catch((error) => {                                 //displays error if one occurs 
      //console.log(error)
      res.status(400).render('404')
    })
})


//TO DO: ADD A ROUTE FOR DELETING USING METHOD OVERRIDE ON THE POST ROUTE for deleting a plant form the database (the delete buttton is on the 'ledger.ejs')

router.delete('/:id', isLoggedIn, function(req, res) {
  db.plant.findOne({
    where: {
      id: req.params.id
    }
  }).then(function(trashPlant){
    // console.log('This is ~~~~~~~~~~~~~ ', trashPlant) //this works
    req.user.removePlant(trashPlant)
    res.redirect('/ledger')
  })
})










module.exports = router;
