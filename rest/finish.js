module.exports = (app, pool, redisClient, config) => {
  app.get('/finish', (req, res) => {
    var vkey = req.cookies['vkey']
    if(!vkey) {
      res.send('Invalid vkey')
      return
    }

    var id = req.user.id

    redisClient.get(`dislink:vkey:${vkey}`, (err, uuid) => {
      if(err) { // Only runs if a legitimate error occurs
        res.send("An error occurred")
        console.log(err)
        return
      }

      if(uuid) { // If the key is in the cache
        redisClient.del(`dislink:vkey:${vkey}`) // Remove the request from the cache

        // Just incase
        var escapedUUID = pool.escape(uuid)
        var escapedId = pool.escape(id)
        var query = `INSERT INTO servrlink(UUID, ID) VALUES(${escapedUUID}, ${escapedId}) ON DUPLICATE KEY UPDATE UUID = ${escapedUUID}, ID = ${escapedId}`

        pool.query(query, (error, results) => {
          if(error) {
            res.send("An error occurred")
            throw error
          }
        })

        res.redirect(config.finishRedirectUrl)
      } else { // Runs if the key is not in the cache
        res.send("Your link request timed out. Log into <b>disl.ink</b> again to generate a new token.")
      }
    })
  })
}
