const express = require('express')
const Treep = require('../models/Treep')
const User = require('../models/User')
const TreepCollection = require('../models/TreepCollection')
const { isLoggedIn } = require('../middlewares')

const router = express.Router()

router.use((req, res, next) => {
  next()
})

// Route to get all treeps from a user
router.get('/user/:userId', isLoggedIn, (req, res, next) => {
  const _ownerId = req.params.userId
  Treep.find({ _ownerId })
    .then(treeps => res.json(treeps))
    .catch(err => next(err))
})

// Route to get one treep
router.get('/:treepId', isLoggedIn, (req, res, next) => {
  Treep.findById(req.params.treepId)
    .then(treep => {
      res.json(treep)
    })
    .catch(err => next(err))
})

router.get('/:treepId/metadata', isLoggedIn, (req, res, next) => {
  const currentUser = req.user._id
  let usersId = []
  Treep.findById(req.params.treepId)
    .then(treep => {
      let query = {
        $or: [
          {
            startDate: {
              $gte: new Date(treep.startDate),
              $lte: new Date(treep.endDate)
            }
          },
          {
            endDate: {
              $gte: new Date(treep.startDate),
              $lte: new Date(treep.endDate)
            }
          },
          {
            $and: [
              { startDate: { $lte: new Date(treep.startDate) } },
              { endDate: { $gte: new Date(treep.endDate) } }
            ]
          }
        ]
      }
      Treep.find(query)
        .then(treeps => {
          // Remove current treep from arrray and any other treeps whose owner is the current user:
          treeps = treeps.filter(el => {
            return (
              JSON.stringify(el._id) !== JSON.stringify(treep._id) &&
              JSON.stringify(el._ownerId) !== JSON.stringify(currentUser)
            )
          })
          treeps.forEach(treep => {
            if (!usersId.includes(JSON.stringify(treep._ownerId))) {
              usersId.push(JSON.stringify(treep._ownerId))
            }
          })
          res.json(treeps)
        })
        .catch(err => next(err))
    })
    .catch(err => next(err))
})

// Route to add a treep
router.post('/add', (req, res, next) => {
  const { _ownerId, name, location, startDate, endDate } = req.body

  Treep.create({
    _ownerId,
    name,
    location,
    startDate,
    endDate
  })
    .then(treep => {
      res.json({
        success: true,
        treep
      })
    })
    .catch(err => next(err))
})

// Route to delete a treep
router.post('/:treepId/delete', (req, res, next) => {
  Treep.findByIdAndDelete(req.params.treepId)
    .then(res => {
      console.log('Treep deleted')
    })
    .catch(err => next(err))
})

// Route to create a collection
router.post('/collections/create', (req, res, next) => {
  const { name, _ownerId } = req.body

  TreepCollection.create({
    name,
    _ownerId
  })
    .then(collection => {
      User.update(
        { _id: _ownerId },
        { $push: { treepCollections: collection._id } }
      )
        .then(res => {
          console.log('collection pushed')
        })
        .catch(err => console.log(err))
      return res.json({
        success: true,
        collection
      })
    })
    .catch(err => next(err))
})

// Route to get collections owned by a user
router.get('/collections/user/:userId', isLoggedIn, (req, res, next) => {
  // FIXME: USE POPULATE??
  const _ownerId = req.params.userId
  TreepCollection.find({ _ownerId })
    .then(collections => res.json(collections))
    .catch(err => next(err))
})

module.exports = router
