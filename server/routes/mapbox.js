const express = require('express')
const { isLoggedIn } = require('../middlewares')
const router = express.Router()
const axios = require('axios')

router.use((req, res, next) => {
  next()
})

// Get search box suggestions
router.get('/:searchQuery', isLoggedIn, (req, res, next) => {
  const searchQuery = req.params.searchQuery
  axios
    .get(
      process.env.MAPBOX_BASE_URL +
        searchQuery +
        '.json?access_token=' +
        process.env.MAPBOX_API_TOKEN +
        '&autocomplete=true&types=country%2Cregion%2Cdistrict%2Cpostcode%2Clocality%2Cplace%2Cpoi%2Cneighborhood%2Caddress'
    )
    .then(suggestions => res.json([...suggestions.data.features]))
    .catch(err => console.log(err))
})

module.exports = router
