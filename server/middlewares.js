function isLoggedIn(req, res, next) {
  console.log('HEY', req.isAuthenticated())
  if (req.isAuthenticated()) next()
  else next({ status: 403, message: 'Unauthorized' })
}

module.exports = {
  isLoggedIn
}
