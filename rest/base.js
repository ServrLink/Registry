module.exports = (app) => {
  app.get('/', (req, res) => {
    // Setup cookie for vkey
    var vkey = req.query.vkey
    if(!vkey) {
      res.send('Invalid vkey')
      return
    }

    res.cookie('vkey', vkey, { maxAge: 10 * 60 * 1000 })

    res.redirect('/login')
  })
}
