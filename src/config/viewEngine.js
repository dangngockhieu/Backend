'use strict';

const express = require('express');
require('dotenv').config();

function configViewEngine(app) {
  app.use(express.static('./src/public'));
  app.set('view engine', 'ejs');
  app.set('views', './src/views');
}

module.exports = { default: configViewEngine };