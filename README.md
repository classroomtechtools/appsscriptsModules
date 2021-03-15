# AppsScripts Modules

Create repos that double as an npm module and regular appsscipts project. Organize your code in modules and namespaces. Import other npm modules.

## Motivation

The AppsScripts platform is powerful and compelling, but it would be nice to organize our codebase easier and make it more shareable. Using this repo and the included scripts, you get a way to make modules and namespaces, unit test them if that's your thing, and reuse them in your other projects.

## How it works

In a nutshell, it utilizes bundling technology with [rollup](http://rollupjs.org). The AppsScripts platform is one big long script; bundling allows the developer to break things up into namespaces.

It works by defining two directories for coding: `src/scripts` and `src/modules`. The latter need `import` and `export` statements that exposes objects so that the former can use them.

The `Bundle.js` file contains some boilerplate code that creates a global `Import` variable, whose properties are those namespaces as exported from the `src/modules/*.js`.

Both directories are combined and placed into `build`. When you push to the appsscripts project, you push everything inside `build`.

## Getting Started

### Initialize

In github:

1. Click "Use as template"
2. Copy the `url` of the repo

In your local directory:

1. `git init`
2. `git checkout -b main`  # may not be necessary if default branch is already "main"
3. `git remote add origin <url>`
4. `git pull`
5. `npm i`
6. Adjust author info in `package.json`
7. `npm run clasp:create`

### Write code

Write regular project files in `/src/scripts`, like and an `onSubmit` trigger. They will be in your project at the top level as normal.

Write modules in `/src/modules`, where you can `export` what you want to be exposed in your main project (via the `Import` global):

```js
// src/scripts/Code.js
function onSubmit (e) {
  const {Namespace} = Import;
  // Namespace is defined below in /modules
}
```

```js
// src/modules/index.js
import {inc} from './functions.js'
const Namespace = {
    doSomething: inc
};
export {Namespace};
```

```js
// scr/modules/functions.js
export const inc = (num) => {
    return num += 1;
};
```

### Test

Optionally, use ava to unit test your modules

```
npm run test

  ✔ test increment

```

### Push to AppsScripts project

```
npm run push
```

### Reuse

As long as the `main` key in `package.json` points to the main module (there has to be one, by default it's `index.js`), you can publish your modules as npm modules, which you can then import into your next project!

For example, if you publish it to npm, you can do this in a module area of your next project:

```
// src/modules/index.js
import {Namespace} from '@org/moduleName';
```

The code you need from that project will then be included in `Bundle.js`!

## Clasp

You'll probably want to use push your codebase to the cloud. Please note that your `.clasp.json` should use the `rootDir` key to indicate that `./build` should be the source for uploading.

## NPM modules

Note that npm modules have a single point of entry, defined by the `main` key in `project.json`, whereas the bundling settings of this project has a different behaviour. 

When you use `export` anywhere inside a `src/modules/*.js` file, it is available on the `Import` global variable of your AppsScripts project. However, with npm modules, when it is reused as a npm module, you'll only be able to `import` from what is exported in the point of entry.

## Using npm modules

All you have to do is this (after `npm install lodash-es`):

```js
import { has } from 'lodash-es';
export {has as obj_has};  // rename it to obj_has
```

And then in your src area:

```js
function myFunction () {
    const {obj_has} = Import;
    const obj = {'one': {'two': 2}};
    obj_has(obj, 'one.two');  // true
}
```

Note that using esmodules instead of CommonJs modules is preferable, since it will be subject to tree shaking, and thus cut down on amount of code that will end up in `Bundle.js`. The above code adds (only) 1200 lines. If you imported all of lodash, however … 

## Rollup settings

Rollup is the bundler used in this case, and it adds just a smidge of boilerplate code to your modules so that you can "import" them with the `Import` global.

```js
{
	input: ['src/modules/*.js'],
	treeshake: true,
	output: {
		format: 'cjs',
		file: './build/Bundle.js',
		banner: 'const Import = Object.create(null);\n',
		intro: '(function (exports, window) {',
		outro: '})(Import, this);'
	},
	plugins: [multi(), resolve(),commonjs()]  # makes above work
}	
```

It makes the `Bundle.js` file, which itself is a CommonJS-style module (one that uses `exports` variable). It uses as a source to build that any JavaScript file in `src/modules/`.

The boilerplate code is found in `banner`, `intro`, and `outro`. So if we write in our module:

```js
// src/modules/index.js
const Namespace = {};
export {Namespace};
```

The bundler will convert that code to the following:

```js
const Import = Object.create(null);  # empty obj
(function (exports, window) {

const Namespace = {};
exports.Namespace = Namespace;

})(Import, this);
```

And that's how we have `Import.Namespace` available in our project.

### Note about that `window` variable

Did you notice that `window` variable?

> The `window` variable is available in your modules code, but is not recommended. Use that global wisely.


## TODO

The bundling technology with [esbuild](https://esbuild.github.io) looks like huge performance benefits for the developer. Maybe this repo should use that instead?
