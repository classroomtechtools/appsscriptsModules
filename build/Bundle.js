/* Bundle as defined from all files in src/modules/*.js */
const Import = Object.create(null);

'use strict';

(function (exports, window) {

Object.defineProperty(exports, '__esModule', { value: true });

/*

This directory (src/modules/) is where you can write appsscript function, classes, etc, and export them, just like with es modules.

When the command `npm run build` is executed, all of the code in this directory
is put into build/Bundle.js

 */

const anything = {};

exports.anything = anything;

})(Import, this);
try{exports.Import = Import;}catch(e){}
