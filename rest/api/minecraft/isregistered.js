const validate = require('uuid-validate')

module.exports = (app, pool) => {
  app.get('/api/minecraft/isregistered', (req, res) => {
    var uuid = req.query.uuid
    if(!validate(uuid)) {
      res.send({
        'success': false,
        'registered': false
      })
      return
    }

    var escaped = pool.escape(uuid)
    var query = `SELECT * FROM servrlink WHERE UUID=${escaped};`
    pool.query(query, (error, result) => {
      if(error) {
        res.send({
          'success': false,
          'registered': false
        })
        throw error
      }

      res.send({
        'success': true,
        'registered': result.length > 0
      })
    })
  })
}
