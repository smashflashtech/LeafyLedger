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
    //console.log(req.params) // plant id
    //console.log(req.user)
    //FIND THE PLANT GOING TO HELL (DELETED) USING REQ.PARAMS.ID
    db.plant.findOne({
        where: { id: req.params.id }
    }).then(function(deadPlant){
        //console.log("THIS IS THE PLANT: ", deadPlant)//this works
        //THEN USE req.user.removePlant(plant) TO DELETE THE ASSOCIATION FROM THE JOIN TABLE
        req.user.removePlant(deadPlant)
        res.redirect('/cemetery') //DELETE IS WORKING
    })
})

router.put('/:id', function(req, res) {
    // console.log('MMMMMMMMMAAAAAGGGGGGGIIIIIICCCCCC', req.body.status)
    // console.log("~~~~~~~~~~~~~~~~~~~~~", req.params.id) // THIS WORKS!
    db.plant.update(
        { status: req.body.status },
        { where: { id: req.params.id }} 
    ).then(
        res.redirect('/ledger') // we decided to send them to the ledger because the user would most likely want to edit their plant once it's back in the ledger.
    )
})


module.exports = router;