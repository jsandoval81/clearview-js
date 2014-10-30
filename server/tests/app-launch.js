'use strict';

var should   = require('should');
var request  = require('supertest');
var mongoose = require('mongoose');
var db       = require('../config/db');


/* This is an integration Test *
describe('Application Startup', function () {
    var url = 'http://localhost:3000';
    before(function (done) {
        
        done();
    });

    it('should catch blank usernames', function (done) {
        var username = '';
        request(url)
            .post('/')
            .send(username)
            .end(function (err, res) {
                if (err) {
                    throw err;
                }
                res.should.have.status(200);
                res.text.should.include('Unknown User');
                done();
            });
    });
});

/* This is a unit test */


