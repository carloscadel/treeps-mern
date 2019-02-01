const express = require('express');
const Treep = require('../models/Treep')

const router = express.Router();


router.use((req, res, next) => {
  console.log('DEBUG routes/treeps');
  next()
})

// Route to get all treeps
router.get('/', (req, res, next) => {
  Treep.find()
    .then(treeps => {
      res.json(treeps);
    })
    .catch(err => next(err))
});

// Route to add a treep
router.post('/', (req, res, next) => {
  let { treepName, treepCountry } = req.body
  Treep.create({ treepName, treepCountry })
    .then(treep => {
      res.json({
        success: true,
        treep
      });
    })
    .catch(err => next(err))
});

module.exports = router;