const mysql = require('mysql')

module.exports = (config) => {
  console.log("Connecting to MySQL")
  var pool = mysql.createPool({
    host: config.database.host,
    port: config.database.port,
    user: config.database.user,
    password: config.database.password,
    database: config.database.database,

    connectionLimit: config.database.pool.maxConnections
  })

  console.log("Setting up tables")
  pool.query("CREATE TABLE IF NOT EXISTS dislink(UUID VARCHAR(36) UNIQUE, ID BIGINT(20) UNIQUE);")

  return pool
}
