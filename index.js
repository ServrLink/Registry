// Imports
const express = require('express')
const fs = require('fs')
const toml = require('toml')
const mysql = require('mysql')
const passport = require('passport')

// Setup config
var config = toml.parse(fs.readFileSync('config.toml', 'utf8'))

// Create web server
const host = config.server.host
const port = config.server.port
const app = require('./server.js')(config)

// Setup redis client
var redisClient = require('./stores/redis.js')(config)

// Setup DB
var pool = require('./stores/mysql.js')(config)

// Discord auth constants
const clientId = config.discord.clientId
const clientSecret = config.discord.clientSecret
const redirectUri = config.discord.redirectUri

// Configure passport
require('./passport.js')(clientId, clientSecret, redirectUri)

// Base URL, setup cookies then redirect to discord
require('./rest/base.js')(app)

// Code -> Token
require('./rest/login.js')(app)

// Discord auth callback
require('./rest/callback.js')(app)

// API
require('./rest/api/minecraft/isregistered.js')(app, pool)
require('./rest/api/discord/isregistered.js')(app, pool)
require('./rest/api/minecraft/getid.js')(app, pool)
require('./rest/api/discord/getuuid.js')(app, pool)

// After user is authenticated, setup database
require('./rest/finish.js')(app, pool, redisClient)

// Start server
app.listen(port, host, () => {
  console.log(`Listening on ${host}:${port}`)
})
