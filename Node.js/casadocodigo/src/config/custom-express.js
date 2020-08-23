require("marko/node-require");
var markoExpress = require("marko/express");

const express = require('express');
const app = express();

const routes = require('../app/routes/routes');
routes(app);

module.exports = app;