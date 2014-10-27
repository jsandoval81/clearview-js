
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
                tasks: ['jshint:serverjs', 'watch', 'nodemon:dev']
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
                    ignore: [ '.bower-*/',
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
                files: ['client/**/*.js'],
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
                files: ['client/assets/css/build/**/*.css', 'client/assets/js/build/**/*.js', 'client/views/*.html'] // TODO: Watch pre-compiled Angular HTML templates
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

        //========================
        //== JavaScript Linting ==
        //========================
        jshint: {
            options: {
                jshintrc: '.jshintrc'
            },
            serverjs: ['server/**/*.js'],
            clientjs: ['client/**/*.js', '!client/assets/js/build/*.js']
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
                    'bower_components/jquery/dist/jquery.js',
                    'bower_components/bootstrap/dist/js/bootstrap.js',
                    // TODO: Add Angular files here
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
            }
        },

        //======================
        //== JavaScript tests ==
        //======================

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
    //== Dev task (Prepare assets, start application, watch for changes)
    grunt.registerTask('dev', ['less:dev', 'csslint:strict', 'concat:css', 'cssmin', 'jshint:clientjs', 'concat:js', 'uglify', 'copy:fonts', 'concurrent:dev']);

};