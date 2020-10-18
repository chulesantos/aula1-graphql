const mysql = require('mysql')

const conexao = mysql.createConnection({
  host: 'mysql',
  port: 3306,
  user: 'root',
  password: '92529887',
  database: 'agenda-petshop',
  multipleStatements: true
})

module.exports = conexao
