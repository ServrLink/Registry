const passport = require('passport')
const passportDiscord = require('passport-discord')

module.exports = (clientId, clientSecret, redirectUri) => {
  passport.serializeUser((user, cb) => {
    cb(null, user)
  })
  passport.deserializeUser((user, cb) => {
    cb(null, user)
  })

  var DiscordStrategy = passportDiscord.Strategy
  passport.use(new DiscordStrategy({
    clientID: clientId,
    clientSecret: clientSecret,
    callbackURL: redirectUri,
    scope: ['identify']
  }, (token, refreshToken, profile, cb) => {
    return cb(null, profile)
  }))
}
