const Pool = require('pg').Pool
const dbConfig = require('../../config/db');

const connection = new Pool({
  host: dbConfig.HOST,
  user: dbConfig.USER,
  password: dbConfig.PASSWORD,
  database: dbConfig.DB,
  port:dbConfig.PORT
});
console.log('connection', connection)

module.exports = connection;
