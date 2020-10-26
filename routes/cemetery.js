const express = require('express');
const router = express.Router();
const axios = require('axios')
const db = require('../models')
const isLoggedIn = require('../middleware/isLoggedIn')



router.get('/', isLoggedIn, function(req,res) {
    req.user.getPlants({
        where: {
            status: 'dead',
        }
    }).then(function(deadPlants) {
        // console.log('==========THIS IS MY BACKEND', deadPlants)
        res.render('cemetery', { plants: deadPlants } )
    })
})



module.exports = router;