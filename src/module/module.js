/* global define */
/* eslint strict: ["error", "function"] */
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
    module.exports = factory(root);
  } else {
    // Browser globals.
    /* eslint-disable-next-line no-param-reassign */
    root.MyBundle = factory(root);
  }
}(this, (root) => {
  'use strict';

  /**
   * Basic principle.
   *
   * Each module/file is surrounded by the object:
   * {
   *   1: ['./src/main', function(impoort, module) {
   *    // module/file
   *   }, { './util1': 2, './util2': 3 }],
   *   ...,
   * }
   * '1' is the unique id of the module,
   * The first element of the array is the relative path of the module.
   *
   * the second element is the function surrounding the javascript file. It
   * provides the functions that replace 'import' and 'export'. For
   * instance, in the js files:
   * "import A from './util';" is replaced by: "const A = impoort('./util');"
   * and "export default B;" is replaced by "module.exports = B;".
   *
   * the third element is an object that lists the imported module with
   * their uid.
   *
   * The function below parses all the modules by executing the function
   * surrounding them and thus import/export the module function/object
   * references.
   *
   */
  return (function() {
    /* istanbul ignore next */
    // This function reads the list of all the modules. It is executed once.
    function read(modules, exportdb, mlist) {
      /**
       * This function returns the reference exported by a module.
       * (it is called by 'impoort')
       *
       * @function (arg1)
       * @public
       * @param {String}          the id of the module to be imported,
       * @returns {Object}        returns the reference of the imported object,
       * @since 0.0.0,
       */
      function getObjectReference(id/* , f */) {
        /**
         * This function returns the reference of the imported element.
         *
         * @function (arg1)
         * @public
         * @param {String}          the relative path of the imported module,
         * @returns {Object}        returns the reference of the imported object,
         * @since 0.0.0,
         */
        function impoort(mpath) {
          const uid = modules[id][2][mpath];
          return getObjectReference(uid || mpath);
        }

        // Check if the module has already been parsed and thus 'exportdb'
        // already contains its reference.
        if (!exportdb[id]) {
          if (!modules[id]) {
            // const c = typeof require === 'function' && require;
            // if (!f && c) return c(id, !0);
            // if (u) return u(id, !0);
            // const a = new Error(`Cannot find module "${id}"`);
            // throw a.code = 'MODULE_NOT_FOUND', a
            throw new Error(`Cannot find module "${id}"`);
          }

          // The reference does not exist. It means that the module hasn't
          // been parsed yet. Thus, we call it to retrieve its reference.
          /* eslint-disable-next-line no-param-reassign */
          exportdb[id] = { exports: {} };
          const p = exportdb[id];
          modules[id][1].call(p.exports, impoort, p, p.exports, read, modules, exportdb, mlist);
        }
        // returns the reference of the module.
        return exportdb[id].exports;
      }
      // const u = typeof require === 'function' && require;
      for (let i = 0; i < mlist.length; i++) {
        getObjectReference(mlist[i]);
      }
      return getObjectReference;
    }
    return read;
  }())({

  }, {}, [1])(1);
}));
