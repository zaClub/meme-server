const mysql = require('mysql')
const { DB_CONFIG } = require('../../app.config')

const pool = mysql.createPool({
  connectionLimit: 10,
  ...DB_CONFIG
})

module.exports = pool
