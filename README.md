#  github-count [![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] 
> fetch github pullrequest or count


## Install

```sh
$ npm install --save github-count
```


## Usage

### JavaScript

```js
var githubCount = require('github-count');

github-count('yashprit', 'github-count', cb);
//=> { pulls: 0, issues: 0, contributors: 1 }
```

### Command Line reference

```sh
$ npm install --global github-count
$ github-count --help
```


## Run Test
```sh
npm test
```

## Contribute or Report Issue
For bugs and feature requests, [please create an issue][issue-url].


## License

MIT © [Yashprit](yashprit.github.io)

[issue-url]: https://github.com/yashprit/github-count/issues
[npm-url]: https://npmjs.org/package/github-count
[npm-image]: https://badge.fury.io/js/github-count.svg
[travis-url]: https://travis-ci.org/yashprit/github-count
[travis-image]: https://travis-ci.org/yashprit/github-count.svg?branch=master
