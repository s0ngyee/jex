module.exports = function(grunt) {
    var configs = {
        PATH: {
            ROOT: '.',
            SRC: 'src/',
            DEST: 'build/',
            DOC: 'doc/'
        }
    };
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        connect: {
            server: {
                options: {
                    keepalive: true,
                    port: 9001,
                    base: './build'
                }
            }

        },
        concat: {
            options: {

            },
            all: {

            },
            anim: {

            },
            core: {
                src: ['src/js/core/*.js'],
                dest: 'build/core/core.js'
            },
            ui: {

            },
            widget: {

            },
            theme: {

            },
            validator: {

            }
        },
        uglify: {
            options: {

            },
            all: {

            },
            anim: {

            },
            core: {
                src: ['build/core/core.js'],
                dest: 'build/core/core.min.js'
            },
            ui: {

            },
            widget: {

            },
            theme: {

            },
            validator: {

            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-yuidoc');

    grunt.registerTask('default', ['concat:core', 'uglify:core']);
};