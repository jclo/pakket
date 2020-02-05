// ESLint declarations:
/* global describe, it */
/* eslint one-var: 0, no-unused-vars: 0, semi-style: 0, no-underscore-dangle: 0 */


// -- Node modules
const should     = require('chai').should()
    , { expect } = require('chai')
    ;


// -- Local modules
const Pakket = require('../index')
    ;


// -- Local constants
const bundle = './test/lib/bundle'
    ;


// -- Local variables


// -- Main
describe('Test Pakket:', () => {
  const pakket = Pakket(bundle, { export: 'AAA' });
  it('Expects pakket.get() to return a string.', (done) => {
    pakket.get((data) => {
      expect(data).to.be.a('string');
      done();
    });
  });

  it('Expects pakket._dump() to return a string.', (done) => {
    pakket._dump(false, (data) => {
      expect(data).to.be.a('string');
      done();
    });
  });
});
