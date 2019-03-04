const express = require('express');
const User = require('../models/User')

const router = express.Router();

router.use((req, res, next) => {
  console.log('DEBUG routes/treeps');
  next()
})

// Route to get one treep
router.get('/:treepId', (req, res, next) => {
  const treepId = req.params.treepId
  User.findOne(req.user._id)
    .then(user => {
      const treep = user.treeps.filter(el => el._id == treepId)
      return res.json(treep[0])
    })
    .catch(err => next(err))
})

// Route to add a treep
router.post('/add', (req, res, next) => {
  // Save dates range already formatted
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  const day = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
  const startD = new Date(req.body.startDate)
  const endD = new Date(req.body.endDate)
  const formattedDates = day[startD.getDay()] + ' ' + startD.getDate() + ' ' + months[startD.getMonth()] + " '" + startD.getFullYear().toString().substring(2) + " - " + day[endD.getDay()] + " " + endD.getDate() + " " + months[endD.getMonth()] + " '" + endD.getFullYear().toString().substring(2)
  let { _ownerId, name, location, startDate, endDate } = req.body
  User.findByIdAndUpdate(_ownerId,
    {
      $push: {
        treeps: {
          name: name,
          location: location,
          startDate: startDate,
          endDate: endDate,
          formattedDates: formattedDates
        }
      }
    })
    .then(res => { console.log('Success') })
    .catch(err => next(err))
})

router.post('/:treepId/delete', (req, res, next) => {
  const treepId = req.params.treepId
  var treeps = []
  User.findOne(req.user._id)
    .then(user => {
      treeps = user.treeps.filter(el => el._id != treepId)
      console.log(treeps)
    })
    .then(user => {
      User.findOneAndUpdate(req.user._id, { treeps: treeps })
        .then(res => console.log('Success'))
    })
    .catch(err => next(err))
})

module.exports = router
