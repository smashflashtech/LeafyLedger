const express = require('express');
const router = express.Router();
const axios = require('axios')
const db = require('../models')
const isLoggedIn = require('../middleware/isLoggedIn')
const methodOverride = require('method-override') 

router.use(methodOverride('_method'))

//ROUTE to GET plants with status dead specific to this user and display on cemetary page
router.get('/', isLoggedIn, (req,res) => {
    req.user.getPlants({
        where: {
            status: 'dead',
        }
    }).then(function(deadPlants) {
        res.render('cemetery', { plants: deadPlants } )
    })
})

//ROUTE - route uses parameter (when remove button is clicked) from URL pattern to delete a plant from the database
router.delete('/:id', isLoggedIn, (req, res) => {
    db.plant.findOne({
        where: { id: req.params.id }
    }).then((deadPlant) => {
        req.user.removePlant(deadPlant)
        res.redirect('/cemetery') 
    })
})

//ROUTER that uses parameter (when resurrect button is clicked) from URL pattern to edit status and change to 'alive'
router.put('/:id', (req, res) => {
    db.plant.update(
        { status: req.body.status },
        { where: { id: req.params.id }} 
    ).then(
        res.redirect('/ledger') 
    )
})


module.exports = router;