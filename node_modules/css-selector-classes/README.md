# css-selector-classes

Returns every class from a CSS selector, as an array.

[![build status](https://secure.travis-ci.org/andrezsanchez/css-selector-classes.png)](http://travis-ci.org/andrezsanchez/css-selector-classes)

# example

```javascript
var classes = require('css-selector-classes');

classes('article.hello > .red') // returns ['hello', 'red']
```

# install
```bash
npm install css-selector-classes
```

# license
MIT
