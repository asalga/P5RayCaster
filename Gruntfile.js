'use strict';

const LIVERELOAD_PORT = 35729;

// const lrSnippet = require('connect-livereload')({
//   port: LIVERELOAD_PORT
// });
const serveStatic = require('serve-static');

module.exports = function(grunt) {

  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    project: {
      app: 'app',
      tmp: 'tmp',
      src: 'src'
    },

    connect: {
      options: {
        port: 9000,
        hostname: '*'
      },
      livereload: {
        options: {
          middleware: function(connect, options) {
            return [
              serveStatic('/app'),
              connect().use('/app', serveStatic('./app')),
              serveStatic('app')
            ]
          }
        }
      }
    },
    concat: {
      options: {
        separator: ';'
      },
      dist: {
        src: ['src/map.pde', 'src/Debugger.pde', 'src/Keyboard.pde', 'src/main.pde', 'src/P5RayCaster.pde'],
        dest: '<%= project.app %>/P5RayCaster-min.js'
      }
    },
    open: {
      server: {
        path: 'http://localhost:<%= connect.options.port %>'
      }
    },
    copy: {
      dev: {
        files: [{
          expand: true,
          src: 'index.html',
          dest: '<%= project.app %>/'
        }, {
          expand: true,
          src: 'libs/*',
          dest: '<%= project.app %>/'
        }, {
          expand: true,
          src: 'data/**/*',
          dest: '<%= project.app %>/'
        }]
      }
    },
    watch: {
      options: {
        spawn: false,
        livereload: true
      },
      concat: {
        files: 'src/*.pde',
        tasks: ['concat']
      }

      // uglify: {
      //   files: '<%= project.src %>/js/{,*/}*.js',
      //   tasks: ['uglify:dev', 'jshint:dev']
      // },
      // browserify: {
      //   files: '<%= project.src %>/js/**/*.js',
      //   tasks: ['browserify:dev', 'jshint:dev', 'uglify:dev']
      // },
      // html: {
      //   files: [page, 'src/partials/**/*.html'],
      //   tasks: ['processhtml:dev', 'l10n', 'replaceTask', 'htmllint:dev', 'exec:dev_check_unmatched_l10n_strings']
      // },
      // localizationCopy: {
      //   files: 'src/json/l10nCopy.js',
      //   tasks: ['jshint:l10nCopy', 'processhtml:dev', 'l10n', 'replaceTask', 'htmllint:dev', 'exec:dev_check_unmatched_l10n_strings']
      // },
      // img: {
      //   files: '<%= project.imgLocal %>/**/*',
      //   tasks: ['copy:dev'],
      //   options: {
      //     livereload: true
      //   }
      // }
    },
    clean: {
      build: {
        src: [
          '<%= project.app %>'
        ]
      }
    },
  });

  grunt.registerTask('default', [
    'copy:dev',
    'concat',
    'connect:livereload',
    'open',
    'watch'
  ]);
};
