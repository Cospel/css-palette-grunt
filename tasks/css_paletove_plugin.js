/*
 * grunt-css_paletove_plugin
 * -
 *
 * Copyright (c) 2016 Michal Lukac
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  // Please see the Grunt documentation for more information regarding task
  // creation: http://gruntjs.com/creating-tasks

  grunt.registerMultiTask('css_paletove_plugin', 'The best Grunt plugin ever.', function() {
    // Merge task-specific and/or target-specific options with these defaults.
    var options = this.options({
    });

    // Iterate over all specified file groups.
    this.files.forEach(function(f) {
      console.log('test');
      console.log(f);

    });
  });

};
