const validate = require('uuid-validate')

module.exports = (app, pool) => {
  app.get('/api/minecraft/getid', (req, res) => {
    var uuid = req.query.uuid
    if(!validate(uuid)) {
      res.send({
        'success': false,
        'id': ''
      })
      return
    }

    var escaped = pool.escape(uuid)
    var query = `SELECT * FROM dislink WHERE UUID=${escaped};`
    pool.query(query, (error, result) => {
      if(error) {
        res.send({
          'success': false,
          'id': ''
        })
        throw error
      }

      if(result.length == 0) {
        res.send({
          'success': false,
          'id': ''
        })
      } else {
        res.send({
          'success': true,
          'id': result[0].ID
        })
      }
    })
  })
}
