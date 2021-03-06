module.exports = function(grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        concat: {
            options: {
                separator: '\n',
                stripBanners: true,
                banner: ['/**',
                ' <%= pkg.name %> - v<%= pkg.version %> - <%= grunt.template.today("yyyy-mm-dd") %>',
                ' This is an autogenerated file which is a concatenation of all JS files in the ',
                ' "js/" directory. DO NOT edit this file.',
                '/\n'].join('\n *'),
            },
            game: {
                src: [
                    './js/helpers.js',
                    './js/resources.js',
                    './js/entities.js',
                    './js/menu.js',
                    './js/engine.js'
                ],
                dest: './build/game.js',
            }
        },
        uglify: {
            options: {
                mangle: false,    // Use if you want the names of your functions and variables unchanged
                compress: true
            },
            game: {
                files: {
                    './build/game.min.js': ['./build/game.js'],
                }
            }
        },
        jshint: {
            all: ['./js/**/*.js'],
            options: {
                undef: true,
                curly: true,
                eqnull: true,
                predef: ['console', 'window', 'document', 'Image', 'Resources',
                    'Player', 'Block', 'Enemy', 'Engine', 'Helpers', 'Heart',
                    'Key', 'Star', 'Gem', 'GameMenu'
                ]
            }
        },
        watch: {
            scripts: {
                files: ['Gruntfile.js', './js/**/*.js'],
                tasks: ['jshint:all', 'concat:game', 'uglify:game'],
                options: {
                    livereload: true
                },
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');

    grunt.registerTask('default', ['watch']);

};
