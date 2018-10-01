const express = require('express')
const cookieParser = require('cookie-parser')
const uuidv4 = require('uuid/v4')
const passport = require('passport')
const rateLimit = require('express-rate-limit')
const session = require('express-session')

module.exports = (config) => {
  const app = express();

  // Configure express
  app.use(session({ secret: uuidv4() }));
  app.use(cookieParser()) // Use cookie management middleware
  app.use(passport.initialize()) // Setup passport
  app.use(passport.session())

  // Ratelimit
  const limiter = rateLimit({
    windowMs: config.server.ratelimit.window * 60 * 1000,
    max: config.server.ratelimit.max
  })
  app.use(limiter)

  return app
}
