//TO DO: REQUIRE STATEMENTS
const express = require('express');   // - express
const db = require('../models')     // - DB
const router = express.Router();      // - express router
const isLoggedIn = require('../middleware/isLoggedIn');
// - method override
const methodOverride = require("method-override")

router.use(methodOverride("_method"))

//ROUTE to GET alive plants specific to user and display them on the ledger page
router.get("/", isLoggedIn, function(req, res) {
    req.user.getPlants({
      where: {
        status: "alive"
      }
    }
    ).then(function(alivePlants){
    res.render("ledger", { plants: alivePlants})
  }) 
})


//ROUTE to POST NEW PLANT to DB and JOIN User and PLANT
router.post('/', (req, res) => {
  console.log("This is IT: ", req.body)
  db.user.findOrCreate({
    where: { id: parseInt(req.body.userId) }
  }).then(function ([returnedUser, created]) {
    db.plant.create(
      {
        common_name: req.body.common_name,
        scientific_name: req.body.scientific_name,
        image_url: req.body.image_url,
        apiId: req.body.apiId,
        lastWatered: req.body.lastWatered,
        status: req.body.status,
      }
  ).then(function (newPlant) {
    returnedUser.addPlant(newPlant.dataValues.id).then(function(userInfo) {
    })
  })
})
  .then((returnedUser) => {
    res.redirect('/ledger')                                 
  })
    .catch((error) => {
      res.status(400).render('404')
    })
})


//ROUTE that uses parameter from the URL pattern (when the trash button is clicked) to delete the plant association with user
router.delete('/:id', isLoggedIn, function(req, res) {
  db.plant.findOne({
    where: {
      id: req.params.id
    }
  }).then(function(trashPlant){
    req.user.removePlant(trashPlant)
    res.redirect('/ledger')
  })
})


//ROUTE to GET specific plant using parameter from the database to edit the lastWater date
router.get('/edit/:id', function (req, res) {
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
  db.plant.update(
    { lastWatered: req.body.lastWatered },
    { where: {id: req.params.id }}
  ).then(
    res.redirect('/ledger')
    )
})



//ROUTE that changes status of plant to alive to dead 
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
