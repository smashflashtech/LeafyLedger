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
    //console.log(alivePlants)
    res.render("ledger", { plants: alivePlants})
  }) 
})


//ROUTE to POST NEW PLANT to DB and JOIN User and PLANT
router.post('/', (req, res) => {
  console.log("This is IT: ", req.body)
  db.user.findOrCreate({
    where: { id: parseInt(req.body.userId) }
  }).then(function ([returnedUser, created]) {
    // console.log("THIS IS THE USER~~~~~~~~~", returnedUser.name, created)
    db.plant.create(
      {
        common_name: req.body.common_name,
        scientific_name: req.body.scientific_name,
        image_url: req.body.image_url,
        apiId: req.body.apiId,
        lastWatered: req.body.lastWatered,
        status: req.body.status,
      }                                   ///ATTENTION: this is working we are happy with this// add to the database
  ).then(function (newPlant) {
    // console.log("YOU HAVE ARRIVE!!!!!!!!!)")
    //console.log("NEW PLANT:", newPlant.dataValues)
    // console.log("RETURNED USER:", returnedUser.name)
    returnedUser.addPlant(newPlant.dataValues.id).then(function(userInfo) {
    //console.log(newPlant.dataValues.common_name, "WAS CREATED~~~~~~~~~~~** and added to", returnedUser)
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


//ROUTE for GET page for EDITTING specific plant water
router.get('/edit/:id', function (req, res) {
  //console.log("~~~~~~~~~~~~~NINJA UNITE", req.params)
  db.plant.findOne({
    where: {
      id: req.params.id
    }
  }).then(function(foundPlant){
    res.render('edit', {editPlant: foundPlant})
    })
})

//UPDATE by PUT the new data for lastWatered into the database
router.put('/edit/:id', function(req, res) {
  //console.log('THIS IS RECK DAT BODY~~~~~~~~~~~~~~~~~~~', req.body.lastWatered) //GOT IT!
  //console.log('THIS IS RECK DAT PARAMs~~~~~~~~~~~~~~~~~~~', req.params)//plant id
  //we need to only edit plant for the specific user
  //it doesnt matter who the user is because now plant IDs are Unique to their user--because now we have a many to many relationship
  db.plant.update(
    { lastWatered: req.body.lastWatered },
    { where: {id: req.params.id }}
  ).then(
    res.redirect('/ledger')
    )
})



// To DO: Add a route that changes status of plant to alive to dead 
router.put('/:id', function(req,res){
  console.log("~~~~~~~~~~~~~~~~~~~~", req.params.id)
  console.log("~~~~~~~~WRECK THAT BODY~~~~~~~~~~~", req.body.status)
  db.plant.update(
    { status: req.body.status },
    { where: {id: req.params.id}}
  ).then(
    res.redirect('/cemetery')
  )
})


module.exports = router;
