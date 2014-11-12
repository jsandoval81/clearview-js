
'use strict';

module.exports = function (grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        //=====================================
        //== Run blocking tasks concurrently ==
        //=====================================
        concurrent: {
            //== Automate the dev environment
            dev: {
                options: {
                    logConcurrentOutput: true
                },
                tasks: ['jshint:serverjs', 'watch', 'nodemon:dev', 'mochaTest']
            }
        },

        //======================
        //== Node app control ==
        //======================
        nodemon: {
            //== Monitor the dev Node app for server file updates
            dev: {
                script: './bin/www',
                // TODO: Fix nodemon restarting even if server js linting fails
                options: {
                    ignore: [ '.bower-*/**/*',
                              '.git/**/*',
                              'bower_components/**/*',
                              'client/**/*',
                              'node_modules/**/*',
                              '.bowerrc',
                              '.csslintrc',
                              '.gitignore',
                              '.jshintignore',
                              '.jshintrc',
                              'bower.json',
                              'package.json',
                              'npm_debug.log',
                              'README.md',
                              'SSO.html'
                            ]
                }
            }
        },

        //=================
        //== Watch files ==
        //=================
        watch: {
            //== Re-compile the LESS files to CSS after LESS updates
            less: {
                files: ['client/assets/css/less/*.less'],
                tasks: ['less:dev'],
                options: {
                    spawn: true
                }
            },
            //== Lint and re-build the CSS .min file after CSS updates
            css: {
                files: ['client/assets/css/*.css'],
                tasks: ['csslint:strict', 'concat:css', 'cssmin', 'copy:fonts'],
                options: {
                    spawn: true
                }
            },
            //== Lint and re-build the client JS .min file after client JS updates
            clientjs: {
                files: ['client/**/*.js', '!client/assets/js/build/**/*', '!client/tests/**/*.js'],
                tasks: ['jshint:clientjs', 'concat:js', 'uglify'],
                options: {
                    spawn: true
                }
            },
            serverjs: {
                files: ['Gruntfile.js', 'server/**/*.js'],
                tasks: ['jshint:serverjs'],
                options: {
                    spawn: true
                }
            },
            //== Reload the web page after updates to CSS, JS, and HTML builds
            livereload: {
                options: { livereload: true },
                files: ['client/assets/css/build/**/*.css', 'client/assets/js/build/**/*.js', 'client/views/*.html', 'client/views/*.ejs']
            }
        },

        //=====================
        //== LESS Processing ==
        //=====================
        less: {
            dev: {
                files: [
                    {
                        expand: true,
                        cwd: 'client/assets/css/less/',
                        src: ['global.less'],
                        dest: 'client/assets/css/',
                        ext: '.css'
                    }
                ]
            }
        },

        //==============
        //== CSS Lint ==
        //==============
        csslint: {
            options: {
                csslintrc: '.csslintrc'
            },
            strict: {
                options: {
                    import: 2
                },
                src: ['client/assets/css/*.css', '!client/assets/css/build/*.css']
            },
            lax: {
                options: {
                    import: false
                },
                src: ['client/assets/css/*.css', '!client/assets/css/build/*.css']
            }
        },

        //=====================
        //== JavaScript Lint ==
        //=====================
        jshint: {
            options: {
                jshintrc: '.jshintrc'
            },
            serverjs: ['server/**/*.js'],
            clientjs: ['client/**/*.js', '!client/assets/js/build/*.js', '!client/tests/**/*.js']
        },

        //========================
        //== File concatination ==
        //========================
        concat: {
            //== Concat the CSS files
            css: {
                src: [
                    'bower_components/bootstrap/dist/css/bootstrap.css',
                    'bower_components/font-awesome/css/font-awesome.css',
                    'client/assets/css/global.css',
                    'client/assets/css/style.css',
                    'client/assets/css/style-mq.css'
                ],
                dest: 'client/assets/css/build/application.css'
            },
            //== Concat the client JS files
            js: {
                src: [
                    'bower_components/angular/angular.js',
                    'client/controllers/main.js',
                    'client/assets/js/custom.js'
                ],
                dest: 'client/assets/js/build/application.js'
            }
        },

        //======================
        //== CSS minification ==
        //======================
        cssmin: {
            minify: {
                expand: true,
                flatten: true,
                cwd:   'client/assets/css/build',
                src:  ['application.css'],
                dest:  'client/assets/css/build',
                ext:   '.min.css'
            }
        },

        //=============================
        //== JavaScript minification ==
        //=============================
        uglify: {
            build: {
                src:  'client/assets/js/build/application.js',
                dest: 'client/assets/js/build/application.min.js'
            }
        },

        //================
        //== Copy files ==
        //================
        copy: {
            fonts: {
                expand: true,
                cwd:    'bower_components/font-awesome/fonts/',
                src:    '**',
                dest:   'client/assets/css/fonts/'
            },
            angular: {
                expand: true,
                cwd:    'bower_components/angular/',
                src:    'angular.js',
                dest:   'client/assets/js/'
            }
        },

        //======================
        //== JavaScript tests ==
        //======================
        mochaTest: {
            options: {
                reporter: 'spec',
                captureFile: 'test-results.txt',
                clearRequireCache: true
            },
            src: ['server/tests/*.js']
        },
        karma: {
            unit: {
                configFile: 'karma.conf.js'
            }
        }

    });

    //=============================
    //== Load Grunt NPM packages ==
    //=============================
    require('load-grunt-tasks')(grunt);

    //====================
    //== Register tasks ==
    //====================
    //== Default task
    grunt.registerTask('default', ['']);
    //== Test task (Run server and client tests)
    grunt.registerTask('test', ['karma:unit']);
    //== Dev task (Prepare assets, start application, watch for changes)
    grunt.registerTask('dev', [ 'copy:fonts',
                                'copy:angular',
                                'less:dev',
                                'csslint:strict',
                                'concat:css',
                                'cssmin',
                                'jshint:clientjs',
                                'concat:js',
                                'uglify',
                                'concurrent:dev'
                                ]);

};