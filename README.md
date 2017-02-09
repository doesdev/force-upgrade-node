# force-upgrade-node [![NPM version](https://badge.fury.io/js/force-upgrade-node.svg)](https://npmjs.org/package/force-upgrade-node)   [![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat)](https://github.com/feross/standard)

> Very forceful, dangerous, not recommended upgrade of Node on Windows

This package is idiotic and no sane person should ever use it.
I only wrote it to run on a prod server for fun and profit. #NotSane.

When the exported function is called it *attempts* to do the following:
1. Get latest LTS release of Node in zip format
2. Unzip it
3. Spin up a GO script that does the following:
  1. Kills all `node.exe` processes
  2. Moves active Node program folder to `${oldFolder}-bak`
  3. Moves contents of downloaded zip into that folder

It does nothing else. Doesn't attempt to cleanup any mess it made with NPM, doesn't do anything about potential issues with installed modules global or otherwise, probably won't work in 90% of cases, will most likely destroy your rig.

Also, if you're dumb enough to run this be advised it needs run from an elevated command prompt in order to do all the file ops.

But seriously, don't run this. It's infinitely stupid and dangerous.

## install

```sh
$ npm install --save force-upgrade-node
```

## usage

```js
const fun = require('force-upgrade-node')
fun()
```

## License

MIT © [Andrew Carpenter](https://github.com/doesdev)
