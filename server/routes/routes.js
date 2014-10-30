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
    app.post('*', function (req, res) {
        //== Retrieve the username and pass it to the index template
        var username  = req.body.username;
        if (!username) {
            username = 'Unknown User';
        }
        res.render('index', {
            username: username
        });
    });
    app.get('*', function (req, res) {
        var ssoPage = path.resolve('SSO.html');
        res.sendFile(ssoPage);
    });

};