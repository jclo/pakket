/* eslint-disable one-var, semi-style */

'use strict';

// -- Node modules
const fs = require('fs')
    ;


// -- Local modules
const Pakket = require('../index');


// -- Local constants


// -- Local variables


// -- Public -------------------------------------------------------------------

const pakket = Pakket('./test/src/main', { export: 'AAA' });
const pakket6 = Pakket('./test/src/main', { export: 'AAA', type: 'es6' });


pakket.get((data) => {
  fs.writeFile('./test/lib/bundle.js', data, 'utf8', (err) => {
    if (err) throw err;
    process.stdout.write('The UMD module is saved in "./test/lib/bundle.js"\n');
  });
});

pakket6.get((data) => {
  fs.writeFile('./test/lib/bundle.mjs', data, 'utf8', (err) => {
    if (err) throw err;
    process.stdout.write('The ES6 module is saved in "./test/lib/bundle.mjs"\n');
  });
});
