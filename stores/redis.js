const redis = require('redis')

module.exports = (config) => {
  var redisOptions = {
    host: config.redis.host,
    port: config.redis.port
  }

  if(config.redis.auth.useAuthentication) {
    redisOptions.password = config.redis.auth.password
  }

  console.log("Connecting to Redis")
  var redisClient = redis.createClient(redisOptions)

  redisClient.on('connect', () => {
    console.log('Connected to Redis')
  })

  redisClient.on('error', (err) => {
    console.log(`Redis error: ${err}`)
  })

  return redisClient
}
