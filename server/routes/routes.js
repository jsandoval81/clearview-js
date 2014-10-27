'use strict';

var path  = require('path');
//== Load data contollers
var fetch = require('../controllers/data-fetch');
var store = require('../controllers/data-store');

module.exports.initialize = function (app) {

    //===================
    //== Server routes ==
    //===================
    app.get('/api/ali', fetch.ali);

    app.post('/admin/help', store.help);

    //======================
    //== Front-end routes ==
    //======================
    app.get('*', function (req, res) {
    	var indexPage = path.resolve('./client/views/index.html');
        res.sendFile(indexPage);
    });
    app.post('*', function (req, res) {
        // TODO: Parse data from SSO and create a user session
        var indexPage = path.resolve('./client/views/index.html');
        res.sendFile(indexPage);
    });

};