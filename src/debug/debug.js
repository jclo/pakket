/** ****************************************************************************
 *
 * A set of methods for debugging.
 *
 * debug.js is just a literal object that contains a set of functions. It
 * can't be intantiated.
 *
 * Private Functions:
 *  . _add                        converts packets to a printable string,
 *
 *
 * Public Static Methods:
 *  . add                         converts packets to a printable string,
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


// -- Local variables


// -- Private Functions --------------------------------------------------------

/**
 * Converts packets to a printable string.
 *
 * @function (arg1)
 * @private
 * @param {Array}           the list of files bundled together,
 * @returns {String}        returns a string representation of packets,
 * @since 0.0.0,
 */
function _add(packets) {
  let s = '\n/*\n// For debugging purpose:\npackets = [\n'
    , prop
    ;

  for (let i = 0; i < packets.length; i++) {
    [prop] = Object.keys(packets[i]);

    s += `\x20\x20{ '${prop}': ${packets[i][prop]} },\n`;
  }
  s += '];\n*/\n';
  return s;
}


// -- Public -------------------------------------------------------------------

module.exports = {

  /**
   * Converts packets to a printable string.
   *
   * @method (arg1)
   * @public
   * @param {Array}         the list of files bundled together,
   * @returns {String}      returns a string representation of packets,
   * @since 0.0.0,
   */
  add(packets) {
    return _add(packets);
  },
};


/* - */
