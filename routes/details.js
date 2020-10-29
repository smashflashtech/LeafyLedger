const express = require('express')
const router = express.Router()
const axios = require('axios')
const isLoggedIn = require('../middleware/isLoggedIn');

//Get route that uses query string from the URL pattern to get details on one plant
router.get("/search", isLoggedIn, (req, res) => {
  const searchPlant = `https://trefle.io/api/v1/plants?token=${process.env.TREFLE_API_KEY}&filter[common_name]=${req.query.common_name}`
  axios.get(searchPlant).then((apiResponse) => {
  const plant = apiResponse.data
  res.render('details', {foundPlant: plant})
  })
})

module.exports = router;