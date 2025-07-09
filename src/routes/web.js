'use strict';

const express = require('express');
const homeController = require('../controller/homeController');

const router = express.Router();

const initWebRoutes = (app) => {
  router.get('/', homeController.handleHelloWord);
  app.use('/', router);
};

module.exports = initWebRoutes;