// Import dotenv to load environment variables
require('dotenv').config()
const express = require('express')
const configViewEngine = require('./config/viewEngine')
const webRoutes = require('./routes/web')
const mysql = require('mysql2')
const app = express()
// Lấy PORT trong .evn
const port = process.env.PORT || 8081
const hostname = process.env.HOST_NAME
// config teamplate engine and sattic files
configViewEngine(app)
// routes
app.use('/', webRoutes)
// Create the connection to database
const connection = mysql.createConnection({
  host: 'localhost',
  port: 3307,
  user: 'root',
  password: '123456',
  database: 'hoidanit',
});
// simple query
connection.query('SELECT * FROM Users u', 
  function(err, results, fields) {
    console.log('Results:', results);
  }
);
app.listen(port,hostname, () => {
  console.log(`Example app listening on port ${port}`)
})
