
# AppsScripts Modules

Create repos that doubles as an npm module and regular appsscipts project. Organize your code in modules and namespaces. Import other npm modules.

Your modules are bundled into `Bundle.js` file, exported in a native AppsScript manner, and availble in your project.

Then, use this repo to make a second project that builds on your first project.

## How it works

It defines two directories for coding: `src/scripts` and `src/modules`. The former should contain files in an AppsScripts project as normal. The latter are javascript files that can `import` and `export`. Anything that is exported from those modules is bundled into one file, `Bundle.js`.

The Bundle.js file contains some boilerplate code that creates a global `Import` variable, whose properties are those exported from the modules.

Both directories are combined and placed into `build`. When you push to the appsscripts project, you push everything inside `build`.

## Getting Started

### Initialize

In github:

1. Click "Use as template"
2. Copy the `url` of the repo

In your local directory:

1. git init
2. git checkout -b main  # may not be necessary if default branch is already "main"
3. git remote add origin <url>
4. git pull
5. npm i
6. Adjust author info in `package.json`
7. npm run clasp:create

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
export const Namespace = {
    doSomething: inc
};
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
