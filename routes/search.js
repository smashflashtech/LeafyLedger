const express = require('express')
const router = express.Router()
const axios = require('axios')
const isLoggedIn = require('../middleware/isLoggedIn');
const { Router } = require('express');

//Get route that uses req.body from the URL pattern to get results on search
router.get('/results', isLoggedIn, (req, res) => {
  console.log(req.query)
  const searchPlants = `https://trefle.io/api/v1/plants?token=${process.env.TREFLE_API_KEY}&filter[common_name]=${req.query.common_name}`
  axios.get(searchPlants).then((apiResponse) => {
    const plants = apiResponse.data.data
    res.render('results', {foundPlants: plants})
  })
})



module.exports = router;