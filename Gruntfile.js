'use strict';

const LIVERELOAD_PORT = 35729;
const serveStatic = require('serve-static');
const app = 'app/';

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
    browserify: {
      dist: {
        files: {
          'app/min.js': ['src/*.js']
        },
        options: {

        }
      }
    },
    // concat: {
    //   options: {
    //     separator: ';'
    //   },
    //   dist: {
    //     // cwd: 'src/',
    //     src: ['src/utils.js','src/TextureStore.js','src/render.js', 'src/texture.js','src/map.js', 'src/Debugger.js', 'src/Keyboard.js', 'src/P5RayCaster.js'],
    //     dest: `${app}/P5RayCaster-min.js`
    //   }
    // },

    open: {
      server: {
        path: 'http://localhost:<%= connect.options.port %>'
      }
    },
    copy: {
      dev: {
        files: [{
          src: ['index.html', 'style.css'],
          dest: `${app}`
        }, {
          expand: true,
          src: 'libs/*.js',
          dest: `${app}`
        }, {
          expand: true,
          cwd: 'data/images/',
          flatten: true,
          src: ['*.{png,jpg,jpeg,gif}'],
          dest: `${app}`
        }]
      }
    },
    watch: {
      options: {
        spawn: false,
        livereload: true
      },
      markup: {
        files: ['index.html', 'style.css'],
        tasks: ['copy'],
        options: {
          livereload: true
        },
      },
      data: {
        files: 'data/**/*',
        tasks: ['copy'],
        options: {
          livereload: true
        },
      },
      js: {
        files: 'src/*.js',
        tasks: ['browserify'],
        options: {
          livereload: true
        },
      },
      images: {
        files: 'data/images/*.png',
        tasks: ['copy'],
        options: {
          livereload: true
        },
      }
    },
    clean: {
      build: {
        src: [
          `${app}`
        ]
      }
    },
  });

  //
  grunt.registerTask('default', [
    'copy:dev',
    'browserify',
    'connect:livereload',
    'open',
    'watch'
  ]);
};
