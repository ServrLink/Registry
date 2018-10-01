const passport = require('passport')

module.exports = (app) => {
  app.get('/login', passport.authenticate('discord', { failureRedirect: '/login' }))
}
