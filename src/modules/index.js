/*

This directory (src/modules/) is where you can write appsscript function, classes, etc, and export them, just like with es modules.

When the command `npm run build` is executed, all of the code in this directory
is put into build/Bundle.js

 */
import {inc} from './functions.js'

const Namespace = {
    doSomething: inc
};

export {Namespace};
