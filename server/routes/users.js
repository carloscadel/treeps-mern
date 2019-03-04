const express = require("express")
const { isLoggedIn } = require("../middlewares")
const router = express.Router()
const User = require("../models/User")

router.get("/current", isLoggedIn, (req, res, next) => {
  res.json({
    user: req.user
  })
})

router.post("/changeuserstatus", isLoggedIn, (req, res, next) => {
  User.findByIdAndUpdate(req.body._userId, { userStatus: req.body.currentUserStatus }).then(data => {
    res.json({
      success: true,
      data
    })
  })
  // console.log(res)
})

router.post("/profpicupload", isLoggedIn, (req, res, next) => {
  console.log("heo")
})

module.exports = router
