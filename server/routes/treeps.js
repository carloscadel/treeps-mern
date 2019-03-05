const express = require('express')
const Treep = require('../models/Treep')

const router = express.Router()

router.use((req, res, next) => {
  console.log('DEBUG routes/treeps')
  next()
})

// Route to get all treeps from a user
router.get('/', (req, res, next) => {
  const _ownerId = req.user._id
  Treep.find({ _ownerId })
    .then(treeps => res.json(treeps))
    .catch(err => next(err))
})

// Route to get one treep
router.get('/:treepId', (req, res, next) => {
  Treep.findById(req.params.treepId)
    .then(treep => {
      let query = { $or: [{ startDate: { $gte: new Date(treep.startDate), $lte: new Date(treep.endDate) } }, { endDate: { $gte: new Date(treep.startDate), $lte: new Date(treep.endDate) } }, { $and: [{ startDate: { $lte: new Date(treep.startDate) } }, { endDate: { $gte: new Date(treep.endDate) } }] }] }
      Treep.find(query)
        .then(treeps => {
          treeps = treeps.filter(el => JSON.stringify(el._id) !== JSON.stringify(treep._id)) // Remove current treep from arrray
          treeps.unshift(treep) // The first element of the array will be the current user's treep
          res.json(treeps)
        })
        .catch(err => next(err))
    })
    .catch(err => next(err))
})

// Route to add a treep
router.post('/add', (req, res, next) => {
  // Save dates range already formatted
  let { _ownerId, name, location, startDate, endDate, hideMe } = req.body
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  const day = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
  const startD = new Date(startDate)
  const endD = new Date(endDate)
  const formattedDates =
    day[startD.getDay()] +
    ' ' +
    startD.getDate() +
    ' ' +
    months[startD.getMonth()] +
    " '" +
    startD
      .getFullYear()
      .toString()
      .substring(2) +
    ' - ' +
    day[endD.getDay()] +
    ' ' +
    endD.getDate() +
    ' ' +
    months[endD.getMonth()] +
    " '" +
    endD
      .getFullYear()
      .toString()
      .substring(2)
  // console.log(formattedDates)
  console.log('req.user', req.user._id)
  console.log('one', _ownerId)
  Treep.create({ _ownerId, name, location, startDate, endDate, formattedDates, hideMe })
    .then(treep => {
      console.log('two', treep)
      res.json({
        success: true,
        treep
      })
    })
    .catch(err => next(err))
})

router.post('/:treepId/delete', (req, res, next) => {
  Treep.findByIdAndDelete(req.params.treepId)
    .then(res => {
      console.log('Treep deleted')
    })
    .catch(err => next(err))
})

module.exports = router
