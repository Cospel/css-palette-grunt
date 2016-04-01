/*
 * grunt-css_paletove_plugin
 * -
 *
 * Copyright (c) 2016 Michal Lukac
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    jshint: {
      all: [
        'Gruntfile.js',
        'tasks/*.js'
      ],
      options: {
        jshintrc: '.jshintrc'
      }
    },

    concat: {
       dist: {
           src: [
            'js/lib/*.js', // All JS in the libs folder
           ],
           dest: 'js/build/production.js',
       }
    },

    // Before generating any new files, remove any previously-created files.
    clean: {
      tests: ['tmp']
    },

    // Configuration to be run (and then tested).
    css_paletove_plugin: {
        files: [{
          src : ['css/base.css', 'css/*.css'],
          dest : '/res/'
        }],
    },
  });

  // Actually load this plugin's task(s).
  grunt.loadTasks('tasks');

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-concat');

  // Whenever the "test" task is run, first clean the "tmp" dir, then run this
  // plugin's task(s), then test the result.
  grunt.registerTask('test', ['clean', 'concat', 'css_paletove_plugin']);

  // By default, lint and run all tests.
  grunt.registerTask('default', ['jshint', 'concat', 'css_paletove_plugin']);

};
