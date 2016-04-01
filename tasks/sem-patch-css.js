/**
 * author: michal.lukac@is4u.cz
 * purpose: Semantic diff of two files with result.
 * css-astdiff 1.css 2.css --verbose
 * node sem-patch-css.js 1.css 2.css
 */

// There are some typescript modules as css and css-semdiff
require('typescript-require');

// Basic imports
var css = require("css");
var semdiff = require("./node_modules/css-semdiff/src/ast_diff.ts");
var fs = require('fs');

/*
 * Load file to string.
 */
function load_file(filename) {
  return fs.readFileSync( filename).toString();
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
          if (missDeclaration.property == extraDeclaration.property) {
            if (missDeclaration.value == extraDeclaration.value) {
              searched = 1;
            }
          }
        });
      });

      // if we find nothing or declaration for given selector is different
      if (searched == 0) {
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
      missingSelConcat[selname].push(fullselector)
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
      // if there is nothing in missing with this selector than add entire element
      result = result + extract_css_sel(fullselector);
    }
  });

  return result;
}

/*
 * Return resulted css.
 */
function get_paletove_css(file1, file2) {
  // load css files to data-structures
  var styleSheet1 = load_css(load_file(file1));
  var styleSheet2 = load_css(load_file(file2));

  // create diff between them
  var diff = semdiff.astDiff(styleSheet1,styleSheet2);

  // get css result
  return get_cssdiff_content(diff.extra, diff.missing);
}

var result = get_paletove_css(process.argv[2], process.argv[3])
console.log(result);

exports.get_paletove_css = get_paletove_css;
