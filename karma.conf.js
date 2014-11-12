'use strict';

module.exports = function(config) {
    var _        = require('lodash'),
        basePath = './',
        assets   = require(basePath + 'client/tests/config/assets.json');

    config.set({

        //== Base path that will be used to resolve files
        basePath: basePath,

        //== Test frameworks to use
        frameworks: ['jasmine'],

        //== List of files/patterns to load in the browser
        files: _.flatten(_.values(assets.core.js)).concat([
            //== Framework libraries
            'bower_components/angular/angular.js',
            'bower_components/angular-mocks/angular-mocks.js',
            //== Framework source files
            'client/controllers/*.js',
            //== Source file tests
            'client/tests/*.js'
        ]),

        //== List of files to exclude
        exclude: [],

        //== Test results reporter to use (possible values: 'dots', 'progress', 'junit', 'growl', 'coverage')
        reporters: ['progress', 'coverage'],

        //== Source files that you want to generate coverage for (these files will be instrumented by Istanbul)
        preprocessors: {
            'client/controllers/*.js': ['coverage']
        },

        //== Coverage results
        coverageReporter: {
            type: 'html',
            dir: 'client/tests/coverage/'
        },

        //== Web server port for tests
        port: 9876,

        //== Enable/disable colors in the output (reporters and logs)
        colors: true,

        //== Level of logging (possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG)
        logLevel: config.LOG_INFO,

        //== Enable/disable watching file and executing tests whenever any file changes
        autoWatch: true,

        //== Start these browsers, currently available:
        //-- Chrome
        //-- ChromeCanary
        //-- Firefox
        //-- Opera
        //-- Safari (only Mac)
        //-- PhantomJS
        //-- IE (only Windows)
        browsers: ['PhantomJS'],

        //== If browser does not capture in given timeout [ms], kill it
        captureTimeout: 60000,

        //== Continuous Integration mode
        //-- if true, it will capture browsers, run tests, and exit
        singleRun: true
    });
};
