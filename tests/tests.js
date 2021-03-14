import test from 'ava';
import {Namespace} from '../src/modules/index.js';


test("test increment", async t => {
    // test with anything
    const actual = Namespace.doSomething(10);
    const expected = 11;
    t.is(actual, expected);
});
