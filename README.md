# Pakket

[![NPM version][npm-image]][npm-url]
[![GitHub last commit][commit-image]][commit-url]
[![Github workflow][ci-image]][ci-url]
[![Test coverage][coveralls-image]][coveralls-url]
[![License][license-image]](LICENSE.md)

`Pakket` is a tool that let you bundle your ES6 Javascript code inside an UMD or ES6 module that runs in the browser. Pakket is similar to Browserify but it is intended for Javascript code relying on the keywords `import` and `export`.

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
./node_modules/.bin/pakket build --name './src/main.js' --export 'MyBundle' --type 'umd' --outpout '/dist/bundle.js'
```

### From a Javascript script

```javascript
const Pakket = require('pakket');

// By default, the generated output is an UMD module.
// If you want to generate an ES6 module, you have
// to specify 'es6' as the type.
const pakket = Pakket('./src/main.js', { export: 'MyBundle', type: 'umd' });

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

// By default, the generated output is an UMD module.
// If you want to generate an ES6 module, you have
// to specify 'es6' as the type.
const pakket = Pakket('./src/main.js', { export: 'MyBundle', type: 'umd' });

function build() {
  return pakket.bundle()
    .pipe(concat('bundle.js'))
    .pipe(dest('./dist'))
  ;
}
```

[ES6Pakket](https://www.npmjs.com/package/@mobilabs/es6pakket) is a boilerplate that allows you writing libraries that rely on `Pakket`.


## License

[MIT](LICENSE.md).

<!--- URls -->

[npm-image]: https://img.shields.io/npm/v/pakket.svg?logo=npm&logoColor=fff&label=NPM+package
[release-image]: https://img.shields.io/github/release/jclo/pakket.svg?include_prereleases
[commit-image]: https://img.shields.io/github/last-commit/jclo/pakket.svg?logo=github
[ci-image]: https://github.com/jclo/pakket/actions/workflows/ci.yml/badge.svg
[coveralls-image]: https://img.shields.io/coveralls/jclo/pakket/master.svg?&logo=coveralls
[npm-bundle-size-image]: https://img.shields.io/bundlephobia/minzip/pakket.svg
[license-image]: https://img.shields.io/npm/l/pakket.svg

[npm-url]: https://www.npmjs.com/package/pakket
[release-url]: https://github.com/jclo/pakket/tags
[commit-url]: https://github.com/jclo/pakket/commits/master
[ci-url]: https://github.com/jclo/pakket/actions/workflows/ci.yml
[coveralls-url]: https://coveralls.io/github/jclo/pakket?branch=master
[npm-bundle-size-url]: https://img.shields.io/bundlephobia/minzip/pakket
[license-url]: http://opensource.org/licenses/MIT
