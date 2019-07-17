const express = require('express')
const { isLoggedIn } = require('../middlewares')
const router = express.Router()
const User = require('../models/User')
const uploadCloud = require('../configs/cloudinary')

router.get('/current', isLoggedIn, (req, res, next) => {
  res.json({
    user: req.user
  })
})

router.post('/changeuserstatus', isLoggedIn, (req, res, next) => {
  User.findByIdAndUpdate(req.body._userId, {
    userStatus: req.body.currentUserStatus
  }).then(data => {
    res.json({
      success: true,
      data
    })
  })
})

router.post(
  '/:id/profpicupload',
  uploadCloud.single('picture'),
  (req, res, next) => {
    User.findByIdAndUpdate(req.params.id, {
      profImgPath: req.file.url,
      public_id: req.file.public_id,
      profImgName: req.file.originalname
    }).then(() => {
      res.json({
        success: true,
        picture: req.file.url
      })
    })
  }
)

// Route to get collections owned by a user
router.get('/:userId/collections', isLoggedIn, (req, res, next) => {
  const _ownerId = req.params.userId
  User.findOne({ _id: _ownerId })
    .populate('treepCollections')
    .then(collections => {
      return res.json(collections.treepCollections)
    })
    .catch(err => next(err))
})

module.exports = router
