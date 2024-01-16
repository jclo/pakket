/*! Generated by Pakket v1.2.0 */
/* global define */
/* eslint no-shadow: ['error', { 'allow': ['root'] }] */
/* eslint strict: ["error", "function"] */
const $__ES6GLOB = {};
(function(root, factory) {
  'use strict';

  /* istanbul ignore next */
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define([''], factory);
  } else if (typeof exports === 'object') {
    // Node. Does not work with strict CommonJS, but
    // only CommonJS-like environments that support module.exports,
    // like Node.
    /* eslint-disable-next-line no-param-reassign */
    module.exports = factory(root);
  } else {
    // Browser globals.
    /* eslint-disable-next-line no-param-reassign */
    root.AAA = factory(root);
  }
/* eslint-disable-next-line */
}($__ES6GLOB,(root)=>{"use strict";return function(){/* istanbul ignore next */function e(t,n,o){function r(f){function i(e){const n=t[f][2][e];return r(n||e)}if(!n[f]){if(!t[f]){throw new Error(`Cannot find module "${f}"`)}n[f]={exports:{}};const r=n[f];t[f][1].call(r.exports,i,r,r.exports,e,t,n,o)}return n[f].exports}for(let e=0;e<o.length;e++){r(o[e])}return r}return e}()({

  /* eslint-disable-next-line no-unused-vars */
  1: ['./test/src/main', function(impoort, module, exports) {
    const util = impoort('./util');

    function A() {
      return util.get();
    }

    /* eslint-disable-next-line no-param-reassign */
    module.exports = A;

  /* eslint-disable-next-line */
  }, { './util': 2 }],

  /* eslint-disable-next-line no-unused-vars */
  2: ['./test/src/util', function(impoort, module, exports) {
    /* eslint-disable-next-line no-param-reassign */
    module.exports = {
      get() {
        return 'AAA';
      },
    };
  }, {}],

/* eslint-disable-next-line */
},{},[1])(1)}));

// -- Export
export default $__ES6GLOB.AAA;
