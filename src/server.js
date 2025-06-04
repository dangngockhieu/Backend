// Import dotenv to load environment variables
require('dotenv').config()
const express = require('express')
const configViewEngine = require('./config/viewEngine')
const webRoutes = require('./routes/web')
const connection = require('./config/database')
const app = express()
// Lấy PORT trong .evn
const port = process.env.PORT || 8081
const hostname = process.env.HOST_NAME
// config res.body
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
// config teamplate engine and sattic files
configViewEngine(app)
// routes
app.use('/', webRoutes)
// Create the connection to database

app.listen(port,hostname, () => {
  console.log(`Example app listening on port ${port}`)
})
