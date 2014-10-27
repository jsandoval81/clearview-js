
module.exports = function(grunt) {
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
                tasks: ['watch', 'nodemon:dev']
            }
        },

        //======================
        //== Node app control ==
        //======================
        nodemon: {
            //== Monitor the dev Node app for Node file updates
            dev: {
                script: './bin/www',
                options: {
                    ignore: [ '.git/**/*',
                              'node_modules/**/*',
                              'client/**/*',
                              '.bowerrc',
                              'bower.json',
                              'Gruntfile.js',
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
            //== Rebuild the CSS min file after CSS edits
            css: {
                files: ['client/assets/css/*.css', 'client/assets/css/less/*.less'],
                tasks: ['concat:css', 'cssmin'], // TODO: Add LESS task here
                options: {
                    spawn: true
                }
            },
            //== Rebuild the JS min file after JS edits
            js: {
                files: ['client/assets/js/*.js'], //TODO: Add Angular files here
                tasks: ['concat:js', 'uglify'],
                options: {
                    spawn: true
                }
            },
            livereload: {
                options: { livereload: true },
                files: ['client/assets/build/**/*', 'client/views/*.html']
            }
        },

        //=====================
        //== LESS Processing ==
        //=====================

        //========================
        //== File concatination ==
        //========================
        concat: {
            //== Concat the CSS files
            css: {
                src: [
                    'bower_components/bootstrap/dist/css/bootstrap.css',
                    'client/assets/css/style.css',
                    'client/assets/css/style-mq.css'
                ],
                dest: 'client/assets/css/build/application.css'
            },
            //== Concat the JS files
            js: {
                src: [
                    'bower_components/jquery/dist/jquery.js',
                    'bower_components/bootstrap/dist/js/bootstrap.js', //TODO: Add Angular files here
                    'client/assets/js/custom.js'
                ],
                dest: 'client/assets/js/build/application.js'
            }
        },

        //==============
        //== CSS Lint ==
        //==============

        //=====================
        //== JavaScript Lint ==
        //=====================

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
        }

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
    grunt.registerTask('dev', ['concat:css', 'cssmin', 'concat:js', 'uglify', 'concurrent:dev']);
    
};