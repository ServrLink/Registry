const isNumber = require('../../../utils/isnumber.js')

module.exports = (app, pool) => {
  app.get('/api/discord/isregistered', (req, res) => {
    var id = req.query.id
    if(!isNumber(id)) {
      res.send({
        'success': false,
        'registered': false
      })
      return
    }

    var escaped = pool.escape(id)
    var query = `SELECT * FROM dislink WHERE ID=${escaped}`
    pool.query(query, (error, result) => {
      res.send({
        'success': true,
        'registered': result.length > 0
      })
    })
  })
}
