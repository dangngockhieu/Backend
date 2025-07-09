'use strict';

require('dotenv/config');
const express = require('express');
const fileUpload = require('express-fileupload');
const bodyParser = require('body-parser');
const cors = require('./config/cors');
const viewEngine = require('./config/viewEngine').default;
const webRoutes = require('./routes/web')
const apiRoutes = require('./routes/api')
const { initTables, initSampleData } = require('./service/initDatabaseService');

const app = express();
const PORT = process.env.PORT || 8080;

// Middleware setup
cors(app);
viewEngine(app);
app.use(fileUpload({ limits: { fileSize: 10 * 1024 * 1024 } })); // 10MB
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

// Routes
webRoutes(app);
apiRoutes(app);

// Database and server start
initTables()
  .then(async () => {
    await initSampleData();
    app.listen(PORT, () => {
      console.log('>>> Service Backend is running on the port = ' + PORT);
    });
  })
  .catch((err) => {
    console.log('>>> CAN NOT START APP, ERROR DURING INIT DATABASE TABLES...');
    console.log(err);
  });