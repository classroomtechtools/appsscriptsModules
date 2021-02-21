import test from 'ava';
import {anything} from '../src/modules/index.js';


test("test anything", async t => {
    // test with anything
    console.log('outputting to stdout:', anything);
    t.pass();
});
