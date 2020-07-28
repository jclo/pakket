#!/usr/bin/env node
/* *****************************************************************************
 * Pakket CLI.
 *
 * The MIT License (MIT)
 *
 * Copyright (c) 2020 Mobilabs <contact@mobilabs.fr> (http://www.mobilabs.fr)
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 * ************************************************************************** */
/* eslint one-var: 0,semi-style: 0 */

'use strict';

// -- Node modules
const fs   = require('fs')
    , nopt = require('nopt')
    ;


// -- Local modules
const Pakket = require('../src/pakket');


// -- Global variables
const lib = 'Pakket'
    , { version } = require('../package.json')
    // Command line Options
    , opts = {
      help: [Boolean, false],
      version: [String, null],
      build: [Boolean, false],
      name: [String, null],
      export: [String, null],
      type: [String, null],
      output: [String, null],
    }
    , shortOpts = {
      h: ['--help'],
      v: ['--version', version],
      n: ['--name'],
      e: ['--export'],
      t: ['--type'],
      o: ['--output'],
    }
    , parsed = nopt(opts, shortOpts, process.argv, 2)
    ;


// -- Private functions --------------------------------------------------------
/* eslint-disable no-underscore-dangle */

/**
 * Displays the help message.
 *
 * @function ()
 * @private
 * @param {}                -,
 * @returns {}              -,
 * @since 0.0.0
 */
function _help() {
  const message = ['',
    'Usage: command [options]',
    '',
    'build               build the UMD module',
    '',
    'Options:',
    '',
    '-h, --help          output usage information',
    '-v, --version       output the version number',
    '-n, --name          the name of the app',
    '-e, --export        the name to be exported',
    '-t, --type          the generated output "umd" or "es6"',
    '-o  --output        the output file',
    '',
  ].join('\n');

  process.stdout.write(`${message}\n`);
  process.exit(0);
}

/**
 * Builds the UMD module.
 *
 * @function (arg1)
 * @private
 * @param {Object}          the optional parameters,
 * @returns {}              -,
 * @since 0.0.0
 */
function _build(options) {
  if (!options.name) {
    process.stdout.write('You must provide an input file!\n');
    _help();
  }

  const pakket = Pakket(options.name, { export: options.export });
  if (options.output) {
    pakket._get((data) => {
      fs.writeFile(options.output, data, (err) => {
        if (err) throw err;
        switch (options.type) {
          case 'generic':
            process.stdout.write(`The generic module is saved in ${options.output}\n`);
            break;

          case 'es6':
            process.stdout.write(`The ES6 module is saved in ${options.output}\n`);
            break;

          default:
            process.stdout.write(`The UMD module is saved in ${options.output}\n`);
        }
      });
    });
  } else {
    pakket.dump();
  }
}

/* eslint-enable no-underscore-dangle */


// -- Public -------------------------------------------------------------------

if (parsed.help) {
  _help();
}

if (parsed.version) {
  process.stdout.write(`${lib} version: ${parsed.version}\n`);
  process.exit(0);
}

if (parsed.argv.remain[0] === 'build') {
  _build(parsed);
} else {
  _help();
}
