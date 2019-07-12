# `d3-flextree` integration

> This project demonstrates importing `d3-flextree` in a Polymer project, using native browser modules.

# Explications

## Importing `d3-flexfree` in browser

The problem with importing `d3-flextree` with the browser's native `import` is that the browser assumes every imported file is a module script, which must be a JavaScript file. However, `d3-flextree` itself [tries to load the version number by importing its `package.json`](https://github.com/Klortho/d3-flextree/blob/3055b4a/src/flextree.js#L2), which is not a JavaScript file, thus causing a browser error when importing `d3-flextree`:

> `Failed to load module script: The server responded with a non-JavaScript MIME type of "application/json". Strict MIME type checking is enforced for module scripts per HTML spec.`

## Importing built `d3-flextree`

When you try to import the built `d3-flextree` (i.e., `d3-flextree/build/d3-flextree.js`), the import fails when it tries to access `this.d3` (or `global.d3`, where `global` is assigned `this`) because [`this` is `undefined` at the top of the file in a module](https://codepen.io/tony19/pen/gNEVmj).

However, loading this file with a `<script>` tag *without `type="module"`* works because [`this` is the `Window` object in that scenario](https://codepen.io/tony19/pen/MMxMNM).

# Solutions

## Use `<script>`

The simplest solution is probably to include `d3-flextree` in `index.html` before importing any script that uses it.

For example:

```html
<script src=""></script>
```

## Patch `d3-flextree`

We could patch `d3-flextree` to replace the import of `package.json` with the [actual version from the file](https://github.com/Klortho/d3-flextree/blob/b1fe7cd/package.json#L3), effectively hard-coding what that import was intending to do:

```js
// import {version} from '../package.json';
const version = '2.1.1';
```

This can be automatically done with [`patch-package`](https://www.npmjs.com/package/patch-package), which automatically patches `d3-flextree` after its installation.

[Demo of patch](https://github.com/tony19-sandbox/emh-d3-flextree)

## Webpack

Another worthwhile solution is to use a module loader that supports JSON-file imports, such as [Webpack](https://webpack.js.org) (see [`polymer3-webpack-starter`](https://github.com/web-padawan/polymer3-webpack-starter)), so the patching workaround would not be necessary to import `d3-flextree` in browser environments. This would effectively obviate Polymer CLI, replacing it with a more advanced/capable toolchain.

[Demo of `d3-flextree` in a Webpack project](https://github.com/tony19-sandbox/d3-flextree-demo)
