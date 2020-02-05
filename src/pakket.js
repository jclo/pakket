/** ****************************************************************************
 *
 * Bundles javascript files in an UMD module.
 *
 * pakket.js is just a literal object that contains a set of functions. It
 * can't be intantiated.
 *
 * Private Functions:
 *  . none,
 *
 *
 * Constructor:
 *  . Pakket                      returns Pakket object,
 *
 *
 * Private Methods:
 *  . _dump                       prints the generated UMD module to stdout,
 *
 *
 * Public Methods:
 *  . get                         creates the UMD module,
 *  . bundle                      inserts the generated UMD module in a Gulp stream,
 *
 *
 *
 * @namespace    Pakket
 * @dependencies none
 * @exports      -
 * @author       -
 * @since        0.0.0
 * @version      -
 * ************************************************************************** */
/* eslint-disable one-var, semi-style, no-underscore-dangle, no-param-reassign */

'use strict';


// -- Node modules
const fs = require('fs')
    ;


// -- Local modules
const parse  = require('./private/parse')
    , Stream = require('./private/streamout')
    , Debug  = require('./debug/debug')
    ;


// -- Local constants
const head = `${__dirname}/module/header`
    , foot = `${__dirname}/module/footer`
    ;


// -- Local variables
let methods;


// -- Public -------------------------------------------------------------------

/**
 * Creates Pakket object.
 *
 * @constructor (arg1, arg2)
 * @public
 * @param {String}          the input file,
 * @param {Object}          the optional parameters,
 * @returns {Object}        returns Pakket object,
 * @since 0.0.0
 */
const Pakket = function(app, options) {
  const obj = Object.create(methods);

  // { export: 'nameofthemodule'}

  obj.app = app;
  obj.export = options && options.export ? options.export : 'MyBundle';
  obj.packets = [];
  return obj;
};


// -- Methods ------------------------------------------------------------------

methods = {

  /**
   * Prints the generated UMD module to stdout.
   *
   * @method (arg1, arg2)
   * @private
   * @param {Boolean}       dump to stdout or return to callback,
   * @param {Function}      function to call at the completion if stdout is false,
   * @returns {}            -,
   * @since 0.0.0
   */
  _dump(stdout, callback) {
    this.get((data) => {
      data += Debug.add(this.packets);
      if (stdout) {
        process.stdout.write(`${data}\n`);
      } else {
        callback(data);
      }
    });
  },

  /**
   * Creates the UMD module.
   *
   * @method ()
   * @public
   * @param {}              -,
   * @returns {}            -,
   * @since 0.0.0
   */
  get(callback) {
    let s = fs.readFileSync(head, 'utf8').replace('{{bundle:name}}', this.export);
    s += '\n';

    parse(this.app, s, this.packets, (buf) => {
      buf += fs.readFileSync(foot, 'utf8');
      callback(buf);
    });
  },

  /**
   * Inserts the generated UMD module in a Gulp stream.
   *
   * @method ()
   * @public
   * @param {}              -,
   * @returns {}            -,
   * @since 0.0.0
   */
  bundle() {
    this.get((data) => {
      Stream.push(this.app, data);
    });
    return Stream.getStream();
  },
};


module.exports = Pakket;
/* - */
