'use strict';

var express      = require('express');
var cookieParser = require('cookie-parser');
var bodyParser   = require('body-parser');
var path         = require('path');
var mongoose     = require('mongoose');
var routes       = require('./server/routes/routes');
var db           = require('./server/config/db');

//========================
//== Initialize Express ==
//========================
var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
//== Have Express serve static assets (web server application should do this in production)
app.use(express.static(path.join(__dirname, 'client/assets')));

//==============================
//== Initialize server routes ==
//==============================
routes.initialize(app);

//==============================
//== Initialize DB Connection ==
//==============================
mongoose.connect(db.url);
mongoose.connection.on('open', function () {
    console.log('Connected to Mongoose...');
});

//== Expose the express app
module.exports = app;
