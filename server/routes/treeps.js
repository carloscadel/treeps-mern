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

router.get('/:treepId', (req, res, next) => {
  Treep.findById(req.params.treepId)
    .then(treep => {
      res.json(treep);
    })
    .catch(err => next(err))
});

// Route to add a treep
router.post('/', (req, res, next) => {
    // Save dates range already formatted
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
  const day = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
  const startD = new Date(req.body.treepStartDate)
  const endD = new Date(req.body.treepEndDate)
  const treepFormattedDates = day[startD.getDay()] + " " + startD.getDate() + " " + months[startD.getMonth()] + " '" + startD.getFullYear().toString().substring(2) + " - " + day[endD.getDay()] + " " + endD.getDate() + " " + months[endD.getMonth()] + " '" + endD.getFullYear().toString().substring(2)
  console.log(treepFormattedDates)
  let { treepName, treepLocation, treepStartDate, treepEndDate, hideMe } = req.body
  Treep.create({ treepName, treepLocation, treepStartDate, treepEndDate, treepFormattedDates, hideMe })
    .then(treep => {
      res.json({
        success: true,
        treep
      });
    })
    .catch(err => next(err))
});

module.exports = router;