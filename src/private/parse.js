/** ****************************************************************************
 *
 * Parses all the files to replace the import and export keywords.
 *
 * parse.js is just a literal object that contains a set of functions. It
 * can't be intantiated.
 *
 * Private Functions:
 *  . _getIndex                   checks if the imported library is new,
 *  . _appendToPackets            appends the imported library to packets if new,
 *  . _replaceImport              replaces the import links,
 *  . _parse                      replaces the import and export links,
 *
 *
 * Public Static Methods:
 *  . parse                       bundles all the 'js' files together,
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
const fs       = require('fs')
    , stream   = require('stream')
    , readline = require('readline')
    , path     = require('path')
    ;


// -- Local modules
const getFromNodeModule = require('./nodemodule');


// -- Local constants


// -- Local variables


// -- Private Functions --------------------------------------------------------

// 'l' looks like: 'export default A;' -> module.export = A;
// 'l' looks like: 'export default A;'

function _replaceExport(line) {
  if (line.search(/export/) > -1 && line.search(/default/) > -1) {
    const l = line.trim().split(' ');
    if (l[0] === 'export' && l[1] === 'default') {
      return line
        .replace('export', 'module.exports')
        .replace('default', '=')
      ;
    }
  }
  return null;
}

/**
 * Checks if the imported library is already referenced.
 *
 * @function (arg1, arg2)
 * @private
 * @param {Array}           contains the list of added files,
 * @param {String}          the absolute path of the imported library,
 * @returns {Number/null}   returns the uid of the imported library or null,
 * @since 0.0.0,
 */
function _getIndex(packets, input) {
  let fi;

  for (let i = 0; i < packets.length; i++) {
    [fi] = Object.keys(packets[i]);
    if (fi === input) {
      return packets[i][input];
    }
  }
  return null;
}

/**
 * Appends the imported library to packets if not in yet.
 *
 * @function (arg1, arg2, arg3)
 * @private
 * @param {Array}           contains the list of added files,
 * @param {Array}           contains the list of the files to retrieve,
 * @param {String}          the absolute path of the imported library,
 * @returns {Number}        returns the uid of the imported library,
 * @since 0.0.0,
 */
function _appendToPackets(packets, fifo, f) {
  const i = _getIndex(packets, f);
  if (i) {
    return i;
  }

  // The imported library is new, so we store its references into fifo and
  // packets.
  fifo.push(f);
  const o = {};
  o[f] = packets.length + 1;
  packets.push(o);
  return packets.length;
}

/**
 * Replaces the import links.
 *
 * @function (arg1, arg2, arg3, arg4, arg5, arg6)
 * @private
 * @param {String}          the current file line,
 * @param {Array}           contains the list of added files,
 * @param {Array}           contains the list of the files to retrieve,
 * @param {String}          the path of the parent file,
 * @param {String}          the root path (from a project perspective),
 * @param {Object}          the list of the imported library,
 * @returns {String/null}   returns the modified import line or null,
 * @since 0.0.0,
 */
/* eslint-disable no-param-reassign */
function _replaceImport(line, packets, fifo, parent, rpath, ims) {
  if (line.search(/import/) > -1 && line.search(/from/) > -1) {
    const l = line.trim().split(' ');
    if (l[0] === 'import' && l[2] === 'from') {
      const s = l[3].replace(';', '').replace(/'/g, '');

      // We convert here the relative path, of the imported library, to an
      // absolute path. If the path starts with './', we consider it refers
      // to a project module, otherwise it refers to a node module.
      let f;
      if (s.match(/(^.\/)|(^..\/)/)) {
        f = path.resolve(path.dirname(parent), s);
      } else {
        f = getFromNodeModule(rpath, s);
      }

      const index = _appendToPackets(packets, fifo, f);
      ims[0] += `'${s}': ${index}, `;

      // transform the line: 'import u from './util';'
      // to: 'const u = impoort('./util');'
      // Nota:
      // The two last replace could seems a bit too complex but it is
      // required for files names '$.js'. If you have to convert:
      //  . 'import x from './$.js'
      // with 'replace(`'${s}'`, `impoort('${s}')`)', you get:
      //  . const u = impoort('./;);
      // It is why you have these two replace for this specific case.
      return line
        .replace('import', 'const')
        .replace('from', '=')
        .replace(`'${s}'`, `impoort("${s}")`)
        .replace(/"/g, '\'')
      ;
    }
  }
  return null;
}
/* eslint-enable no-param-reassign */

/**
 * Parses all the js files to find the import and export links.
 *
 * @function (arg1, arg2, arg3, arg4, arg5)
 * @private
 * @param {Array}           contains the list of the files to retrieve,
 * @param {String}          the buffer containing the bundled js files,
 * @param {Array}           the list of the bundled js files,
 * @param {String}          the root path,
 * @param {Function}        the function to call at the completion,
 * @returns {}              -,
 * @since 0.0.0,
 */
/* eslint-disable no-param-reassign */
function _parse(fifo, buffer, packets, rpath, callback) {
  const input = fifo.shift()
      , bufferStream = new stream.PassThrough()
      , ims = ['']
      ;

  let im
    , ex
    , l
    ;

  // We start the buffer with a reference to the js file to be added.
  // it is:
  // id: ['./src/main', function(impoort, module) {
  // 'id' is the uid of the file,
  // './src/main' is the relative path to the file without the extension 'js',
  buffer += '\x20\x20/* eslint-disable-next-line no-unused-vars */\n';
  buffer += `\x20\x20${_getIndex(packets, input)}: `;
  const lib = `./${path.relative(rpath, input)}`.replace('./node_modules/', '');
  buffer += `['${lib}', `;
  buffer += 'function(impoort, module, exports) {\n';

  bufferStream.end(Buffer.from(fs.readFileSync(`${input}.js`)));
  const rl = readline.createInterface({
    input: bufferStream,
    crlfDelay: Infinity,
  });

  // We read the first file of the fifo, line by line. The goal is to find
  // the line containing "import X from './xxx'" and replace it by:
  // "const X = impoort('./xxx')"
  rl.on('line', (line) => {
    im = _replaceImport(line, packets, fifo, input, rpath, ims);
    ex = _replaceExport(line);
    if (im) {
      buffer += `\x20\x20\x20\x20${im}\n`;
    } else if (ex) {
      buffer += '\x20\x20\x20\x20/* eslint-disable-next-line no-param-reassign */\n';
      buffer += `\x20\x20\x20\x20${ex}\n`;
    } else {
      l = `\x20\x20\x20\x20${line}`.trimEnd();
      buffer += `${l}\n`;
    }
  });

  // When the end of the file is reached, we append the line:
  // "}, { '@mobilabs/overslash': 2, './util1': 3, './util2': 4 }],"
  // the object contains the name of the files to import in the parsed file
  // and their unique id.
  // Then, if the fifo isn't empty we process the next file in the fifo.
  rl.on('close', () => {
    if (ims[0].length > 0) {
      buffer += '\n\x20\x20/* eslint-disable-next-line */\n';
      buffer += `\x20\x20}, { ${ims[0].slice(0, -2)} }],\n\n`;
    } else {
      buffer += '\x20\x20}, {}],\n\n';
    }
    if (fifo.length > 0) {
      _parse(fifo, buffer, packets, rpath, callback);
    } else {
      callback(buffer);
    }
  });
}
/* eslint-enable no-param-reassign */


// -- Public -------------------------------------------------------------------

/**
 * Retrieves and bundles together all the js files linked to 'input'.
 *
 * @function (arg1, arg2, arg3, arg4)
 * @public
 * @param {String}          the input file,
 * @param {String}          the buffer containing the bundled js files,
 * @param {Array}           the list of the bundled js files,
 * @param {Function}        the function to call at the completion,
 * @returns {}              -,
 * @since 0.0.0,
 */
module.exports = function(input, buffer, packets, callback) {
  const rpath = path.resolve(path.parse(input).root)
      , fifo  = []
      , f     = input.replace('.js', '')
      , o     = {}
      ;

  o[f] = 1;
  packets.push(o);
  fifo.push(f);
  _parse(fifo, buffer, packets, rpath, callback);
};

/* - */
