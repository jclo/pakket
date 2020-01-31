# How to build the Header and the Footer

## Compress

Compress `module.js` with the command:

```bash
./node_modules/.bin/terser --mangle --output src/module/module.min.js -- src/module/module.js
```

## Make the Header

You get a file that looks like:

```javascript
(function(e,t){"use strict"; ... return e}()({},{},[1])(1)});
```

The header part is:

```javascript
(function(e,t){"use strict"; ... return e}()({
```

An the footer is:

```javascript
},{},[1])(1)});
```

that's all!
