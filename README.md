# @hyperapp/redux-devtools

[![Travis CI](https://img.shields.io/travis/hyperapp/redux-devtools/master.svg)](https://travis-ci.org/hyperapp/redux-devtools)
[![Codecov](https://img.shields.io/codecov/c/github/hyperapp/redux-devtools/master.svg)](https://codecov.io/gh/hyperapp/redux-devtools)
[![npm](https://img.shields.io/npm/v/@hyperapp/redux-devtools.svg)](https://www.npmjs.org/package/@hyperapp/redux-devtools)
[![Slack](https://hyperappjs.herokuapp.com/badge.svg)](https://hyperappjs.herokuapp.com "Join us")

A [Hyperapp](https://github.com/hyperapp/hyperapp) higher-order `app` that logs state updates to redux devtools.

[Try it Online](https://codepen.io/okwolf/pen/xLQmvW?editors=0010)

![Screenshot](https://user-images.githubusercontent.com/3735164/34082934-657f864c-e31c-11e7-93d2-d70f190aa928.png)

## Installation

### Node.js

Install with npm / Yarn.

<pre>
npm i <a href="https://www.npmjs.com/package/@hyperapp/redux-devtools">@hyperapp/redux-devtools</a>
</pre>

Then with a module bundler like [rollup](https://github.com/rollup/rollup) or [webpack](https://github.com/webpack/webpack) use as you would anything else.

```jsx
import redux-devtools from "@hyperapp/redux-devtools"
```

### Browser

Download the minified library from the [CDN](https://unpkg.com/@hyperapp/redux-devtools).

```html
<script src="https://unpkg.com/@hyperapp/redux-devtools"></script>
```

You can find the library in `window.redux-devtools`.

## Usage

```js
import devtools from 'hyperapp-redux-devtools';

devtools(app)(state, actions, view, document.body)
```

## License

@hyperapp/redux-devtools is MIT licensed. See [LICENSE](LICENSE.md).