# Pakket

[![NPM version][npm-image]][npm-url]
[![Travis CI][travis-image]][travis-url]
[![Test coverage][coveralls-image]][coveralls-url]
[![Dependencies status][dependencies-image]][dependencies-url]
[![Dev Dependencies status][devdependencies-image]][devdependencies-url]
[![License][license-image]](LICENSE.md)
<!--- [![node version][node-image]][node-url] -->
[![NPM install][npm-install-image]][npm-install-url]

`Pakket` is a tool that let you bundle your ES6 Javascript code inside an UMD module that runs in the browser. Pakket is similar to Browserify but it is intended for Javascript code relying on the keywords `import` and `export`.

Thus, with `Pakket`, you can split your ES6 Javascript code into multiple files by using the keywords `import` and `export`. You can then bundle them without requiring a compiler to replace `import` and `export`.


## Quick Startup

Write your source files with `import` and `export` like this:

```javascript
import U from './util';

function A() {
  U();
}

export default A;
```

Then, bundle it.


### From a command line

```bash
./node_modules/.bin/pakket build --name './src/main.js' --export 'MyBundle' --outpout '/dist/bundle.js'
```

### From a Javascript script

```javascript
const Pakket = require('pakket');

const pakket = Pakket('./src/main.js', { export: 'MyBundle' });

pakket.get((data) => {
  fs.writeFile('./dist/bundle.js', data, 'utf8', (err) => {
    if (err) throw err;
    process.stdout.write('The UMD module is saved in "./dist/bundle.js"\n');
  });
});
```

### Using Gulp

```javascript
const Pakket = require('pakket');

const pakket = Pakket('./src/main.js', { export: 'MyBundle' });

function build() {
  return pakket.bundle()
    .pipe(concat('bundle.js'))
    .pipe(dest('./dist'))
  ;
}
```

## License

[MIT](LICENSE.md).

<!--- URls -->

[npm-image]: https://img.shields.io/npm/v/pakket.svg?style=flat-square
[npm-install-image]: https://nodei.co/npm/pakket.png?compact=true
[node-image]: https://img.shields.io/badge/node.js-%3E=_0.10-green.svg?style=flat-square
[download-image]: https://img.shields.io/npm/dm/pakket.svg?style=flat-square
[travis-image]: https://img.shields.io/travis/jclo/pakket.svg?style=flat-square
[coveralls-image]: https://img.shields.io/coveralls/jclo/pakket/master.svg?style=flat-square
[dependencies-image]: https://david-dm.org/jclo/pakket/status.svg?theme=shields.io
[devdependencies-image]: https://david-dm.org/jclo/pakket/dev-status.svg?theme=shields.io
[license-image]: https://img.shields.io/npm/l/pakket.svg?style=flat-square

[npm-url]: https://www.npmjs.com/package/pakket
[npm-install-url]: https://nodei.co/npm/pakket
[node-url]: http://nodejs.org/download
[download-url]: https://www.npmjs.com/package/pakket
[travis-url]: https://travis-ci.org/jclo/pakket
[coveralls-url]: https://coveralls.io/github/jclo/pakket?branch=master
[dependencies-url]: https://david-dm.org/jclo/pakket
[devdependencies-url]: https://david-dm.org/jclo/pakket?type=dev
[license-url]: http://opensource.org/licenses/MIT
