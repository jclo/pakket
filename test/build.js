/* eslint-disable one-var, semi-style */


// -- Node modules
const fs = require('fs')
    ;


// -- Local modules
const Pakket = require('../index');


// -- Local constants


// -- Local variables


// -- Public -------------------------------------------------------------------

const pakket = Pakket('./test/src/main', { export: 'AAA' });

pakket.get((data) => {
  fs.writeFile('./test/lib/bundle.js', data, 'utf8', (err) => {
    if (err) throw err;
    // process.stdout.write('The UMD module is saved in "./test/lib/bundle.js"\n');
  });
});
