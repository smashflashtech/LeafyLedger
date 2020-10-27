const express = require('express');
const router = express.Router();
const axios = require('axios')
const db = require('../models')
const isLoggedIn = require('../middleware/isLoggedIn')
const methodOverride = require('method-override') // npm install method-override // refactor?

router.use(methodOverride('_method'))

router.get('/', isLoggedIn, function(req,res) {
    req.user.getPlants({
        where: {
            status: 'dead',
        }
    }).then(function(deadPlants) {
        res.render('cemetery', { plants: deadPlants } )
    })
})

router.delete('/:id', isLoggedIn, function(req, res) {
    console.log(req.params) // plant id
    console.log(req.user)
    req.user.getPlants({
        where: {
            id: // not sure what goes here (NOT req.params.id),
            // we want to delete from join table NOT plant table
        }
    }).then(function(plantHell){
        db.plantsUsers.destroy({
            // Not sure how to proceed from here
        })
    })
    // db.plant.destroy({
    //   where: { plant: plant }
    // }).then(function() {
    //   // do something when done deleting
    //   res.redirect('/cemetery')
    // });
})


module.exports = router;