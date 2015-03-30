#!/usr/bin/env node

'use strict';
var argv = require('minimist')(process.argv.slice(2));
var githubCount = require('./');

var username = argv.u;
var reponame = argv.r;

githubCount(username, reponame, function(err, data) {
  console.log(err, data)
})
