> Demo for integrating `d3-flextree`

The problem with importing `d3-flextree` with the browser's native `import` is that the browser assumes every imported file is a module script, which must be a JavaScript file. However, `d3-flextree` [tries to load the version number from its `package.json`](https://github.com/Klortho/d3-flextree/blob/3055b4a/src/flextree.js#L2), which is not a JavaScript file, thus causing a browser error when importing `d3-flextree`:

> `Failed to load module script: The server responded with a non-JavaScript MIME type of "application/json". Strict MIME type checking is enforced for module scripts per HTML spec.`

When you try to import the built `d3-flextree` (`d3-flextree/build/d3-flextree.js`), the import fails when it tries to access `this.d3` (or `global.d3`, where `global` is assigned `this`) because `this` is `undefined` at the top of the file due to [strict mode](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Strict_mode), which is automatically applied for `<script tyoe="module">`.

I suspect this problem is avoided by most people by loading the `d3-flextree` from CDN in a `<script>` tag in `index.html`.

To workaround the issue, we can replace the import of `package.json` with the actual version from the file, effectively hard-coding what the import was intending to do:

```js
// import {version} from '../package.json';
const version = '2.1.1';
```

Another worthwhile solution is to use a module loader that supports JSON-file imports, such as [Webpack](https://webpack.js.org), so the patching above would not be necessary to import `d3-flextree` in browser environments. This would effectively obviate Polymer CLI, replacing it with a more advanced/capable toolchain (see [`polymer3-webpack-starter`](https://github.com/web-padawan/polymer3-webpack-starter)).
