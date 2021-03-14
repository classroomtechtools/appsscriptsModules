/* Bundle as defined from all files in src/modules/*.js */
const Import = Object.create(null);

'use strict';

(function (exports, window) {

Object.defineProperty(exports, '__esModule', { value: true });

var work_js = require('work.js');

const doSomething = () => {

};

/*

This directory (src/modules/) is where you can write appsscript function, classes, etc, and export them, just like with es modules.

When the command `npm run build` is executed, all of the code in this directory
is put into build/Bundle.js

 */

const Namespace = {
    doSomething: work_js.doSomething
};

exports.Namespace = Namespace;
exports.doSomething = doSomething;

})(Import, this);
try{exports.Import = Import;}catch(e){}
