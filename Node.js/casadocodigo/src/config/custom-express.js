require("marko/node-require");
var markoExpress = require("marko/express");

const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use('/static', express.static('src/app/public'));

app.use(bodyParser.urlencoded({
    extented: true
}));

const routes = require('../app/routes/routes');
routes(app);

module.exports = app;