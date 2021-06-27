const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const passport = require('passport');

const { AuthStrategies } = require('./src/usuarios');

app.use(passport.initialize());

app.use(bodyParser.json());

module.exports = app;
