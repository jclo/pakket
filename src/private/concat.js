/** ****************************************************************************
 *
 * Concatenates the bundled js modules in an UMD/ES6 module.
 *
 * concat.js is just a literal object that contains a set of functions. It
 * can't be intantiated.
 *
 * Private Functions:
 *  . _concat                     returns the UMD or ES6 Module,
 *
 *
 * Public Static Methods:
 *  . concat                      returns the UMD or ES6 Module,
 *
 *
 *
 * @namespace    -
 * @dependencies none
 * @exports      -
 * @author       -
 * @since        0.0.0
 * @version      -
 * ************************************************************************** */
/* eslint-disable one-var, semi-style, no-underscore-dangle */

'use strict';


// -- Node modules


// -- Local modules


// -- Local constants
const ES6GLOB = '$__ES6GLOB';


// -- Local variables


// -- Private Functions --------------------------------------------------------

/**
 * Returns the UMD or ES6 Module.
 *
 * @function (arg1, arg2, arg3, arg4, arg5)
 * @private
 * @param {String}          the UMD header,
 * @param {String}          the bundled js modules,
 * @param {String}          the UMD footer,
 * @param {String}          the exported name,
 * @param {String}          the type of module to generate (generic, umd or es6),
 * @returns {String}        returns the UMD/ES6 Module,
 * @since 0.0.0,
 */
/* eslint-disable no-param-reassign */
function _concat(header, content, footer, name, type) {
  let head;
  let foot;
  let exportM;

  switch (type) {
    case 'generic':
      head = header;
      foot = footer;
      break;

    case 'es6':
      head = header.replace('{{lib:es6:define}}', `const ${ES6GLOB} = {};`)
        .replace('{{lib:es6:link}}', ES6GLOB);

      exportM = '\n// -- Export\n';
      exportM += `export default ${ES6GLOB}.${name};`;
      foot = footer.replace('{{lib:es6:export}}', exportM);
      break;

    default:
      // By default, we consider it is an umd module
      head = header.replace('{{lib:es6:define}}\n', '').replace('{{lib:es6:link}}', 'this');
      foot = footer.replace('{{lib:es6:export}}\n', '');
  }

  return `${head}${content}${foot}`;
}
/* eslint-enable no-param-reassign */


// -- Public -------------------------------------------------------------------

/**
 * Returns the UMD or ES6 Module.
 *
 * @function (arg1, arg2, arg3, arg4, arg5)
 * @public
 * @param {String}          the UMD header,
 * @param {String}          the bundled js modules,
 * @param {String}          the UMD footer,
 * @param {String}          the exported name,
 * @param {String}          the type of module to generate (generic, umd or es6),
 * @returns {String}        returns the UMD/ES6 Module,
 * @since 0.0.0,
 */
module.exports = function(header, content, footer, name, type) {
  return _concat(header, content, footer, name, type);
};

/* - */
