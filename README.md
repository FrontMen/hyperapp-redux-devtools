# @frontmen/hyperapp-redux-devtools

[![Travis CI](https://img.shields.io/travis/FrontMen/hyperapp-redux-devtools/master.svg)](https://travis-ci.org/FrontMen/hyperapp-redux-devtools)
[![codecov](https://codecov.io/gh/FrontMen/hyperapp-redux-devtools/branch/master/graph/badge.svg)](https://codecov.io/gh/FrontMen/hyperapp-redux-devtools)
[![npm](https://img.shields.io/npm/v/@frontmen/hyperapp-redux-devtools.svg)](https://www.npmjs.org/package/@frontmen/hyperapp-redux-devtools)
[![Slack](https://hyperappjs.herokuapp.com/badge.svg)](https://hyperappjs.herokuapp.com "Join us")

A [Hyperapp](https://github.com/hyperapp/hyperapp) higher-order `app` that logs state updates to redux devtools.

[Try it Online](https://codepen.io/lassecapel/pen/QaMKXQ?editors=0010)

<!-- ![Screenshot](https://user-images.githubusercontent.com/3735164/34082934-657f864c-e31c-11e7-93d2-d70f190aa928.png) -->

## Installation

### Node.js


Install with npm / Yarn.

<pre>
npm i <a href="https://www.npmjs.com/package/@frontmen/hyperapp-redux-devtools">@frontmen/hyperapp-redux-devtools</a>
</pre>

Then with a module bundler like [rollup](https://github.com/rollup/rollup) or [webpack](https://github.com/webpack/webpack) use as you would anything else.

```jsx
import withReduxDevtools from "@frontmen/hyperapp-redux-devtools"
// Or as a named import: 
import { withReduxDevtools } from "@frontmen/hyperapp-redux-devtools"
```

### Browser

Download the minified library from the [CDN](https://unpkg.com/Frontmen/hyperapp-redux-devtools).

```html
<script src="https://unpkg.com/Frontmen/hyperapp-redux-devtools"></script>
```

You can find the library in `window.withReduxDevtools`.

## Usage

```js
import withReduxDevtools from 'hyperapp-redux-devtools';

withReduxDevtools(app)(state, actions, view, document.body)
```

## License

@frontmen/hyperapp-redux-devtools is MIT licensed. See [LICENSE](LICENSE.md).