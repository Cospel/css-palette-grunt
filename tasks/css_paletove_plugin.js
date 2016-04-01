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
    var tpr = require('typescript-require');
    var css = require("css");
    var semdiff = require("../node_modules/css-semdiff/src/ast_diff.ts");
    var fs = require('fs');

    var options = this.options({
      base: 'base.css'
    });

    /*
     * Load file to string.
     */
    function load_file(filename) {
      return grunt.file.read(filename);
    }

    /*
     * Load content of css file to css structure.
     */
    function load_css(content) {
      return css.parse(content);
    }

    /*
     * Return css element.
     */
    function extract_css_sel(selector) {
      var content = "";

      selector.declarations.forEach(function(elem) {
        content += "  " + elem.property + ":" + elem.value + ";\n";
      });

      return selector.selectors[0] + " {\n" + content + "}\n\n";
    }

    /*
     * Return css element witch checking in missing.
     */
    function extract_css_sel_diff(extra, missing) {
      var content = "";
      // go through every declaration of selector { property: value; property: value}
      extra.declarations.forEach(function(extraDeclaration) {
        var searched = 0;
        // go through every selector from missing
        missing.forEach(function(missSelector) {
          // go through every declaration of given selector
          missSelector.declarations.forEach(function(missDeclaration) {
            // if there is same declaration than remember it
            if (missDeclaration.property === extraDeclaration.property) {
              if (missDeclaration.value === extraDeclaration.value) {
                searched = 1;
              }
            }
          });
        });

        // if we find nothing or declaration for given selector is different
        if (searched === 0) {
          content += "  " + extraDeclaration.property + ":" + extraDeclaration.value + ";\n";
        }
      });
                                                                                                                         return extra.selectors[0] + " {\n" + content + "}\n\n";
    }

    
    function get_cssdiff_content(extra, missing) {
      var missingSelConcat = {};
      var result  = '';

      // create hash with all missing for future checking in extra
      missing.forEach(function(fullselector) {
        var selname = fullselector.selectors[0];

        // if we already have some
        if(selname in missingSelConcat) {
          missingSelConcat[selname].push(fullselector);
        } else {
          missingSelConcat[selname] = [fullselector];
        }
      });

      // resulted css has almost everything from extra
      extra.forEach(function(fullselector) {
        var selname = fullselector.selectors[0];

        if(selname in missingSelConcat) {
          // if there is already css selector in missing
          // just pick the items from seconds which has different value or missing
          result = result + extract_css_sel_diff(fullselector, missingSelConcat[selname]);
        } else {
          result = result + extract_css_sel(fullselector);
        }
      });

      return result;
    }

    /*
     * Return resulted css.
     */
    function get_paletove_css(file1, file2) {
      var styleSheet1 = load_css(load_file(file1));
      var styleSheet2 = load_css(load_file(file2));

      var diff = semdiff.astDiff(styleSheet1,styleSheet2);

      return get_cssdiff_content(diff.extra, diff.missing);
    }

    // Main
    var baseContent = grunt.file.read(options.base);
    this.files.forEach(function (f) {
      var translations = [];
      f.src.forEach(function(filePath) {
          var content = get_paletove_css(options.base, filePath);

          // write result file
          var path = filePath.split('/');
          var name = f.dest + path[path.length-1];
          grunt.file.write(name, content);
      });
    });                    
  });
};
