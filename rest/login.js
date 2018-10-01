const passport = require('passport')

module.exports = (app) => {
  app.get('/callback', passport.authenticate('discord', { failureRedirect: '/' }), (req, res) => res.redirect('/finish'))
}
