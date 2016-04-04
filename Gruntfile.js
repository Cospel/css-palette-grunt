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

    // Configuration to be run (and then tested).
    css_paletove_plugin: {
       default_options: {
        options: {
          base: 'css/base/base.css'
        },
        files: [
             { src: ['css/palette/*.css'], dest: 'css/result/' }
        ]
    }},
  });

  // Actually load this plugin's task(s).
  grunt.loadTasks('tasks');

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-jshint');

  // Whenever the "test" task is run, first clean the "tmp" dir, then run this
  // plugin's task(s), then test the result.
  grunt.registerTask('test', ['css_paletove_plugin']);

  // By default, lint and run all tests.
  grunt.registerTask('default', ['css_paletove_plugin']);

};
