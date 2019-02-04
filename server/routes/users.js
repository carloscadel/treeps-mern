const express = require('express');
const { isLoggedIn } = require('../middlewares')
const router = express.Router();

router.get('/home', isLoggedIn, (req, res, next) => {
  console.log("HAHAHAHAHAHAHA", req.user)
  res.json({
    secret: 42,
    user: req.user
  });
});

module.exports = router;
