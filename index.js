'use strict';

var async = require('async');
var got = require('got');
var parseLinkHeader = require('parse-link-header');

var _pool = {};

var githubApi = function(url) {

  return {
    pull_requests: function(callback) {
      var pulls = url + "/pulls?per_page=1";
      got(pulls, function(err, data, res) {
        try {
          var count = Number(parseLinkHeader(res.headers["link"]).last.page);
        } catch (er) {
          var count = data.length;
        }
        callback(count);
      });
    },
    issues: function(callback) {
      var issues = url + "/issues?per_page=1";
      got(issues, function(err, data, res) {
        try {
          var count = Number(parseLinkHeader(res.headers["link"]).last.page);
        } catch (er) {
          var count = data.length;
        }
        callback(count);
      });
    },
    contributors: function(callback) {
      var contrib = url + "/contributors?per_page=1";
      got(contrib, function(err, data, res) {
        try {
          var count = Number(parseLinkHeader(res.headers["link"]).last.page);
        } catch (er) {
          var count = data.length;
        }
        callback(count);
      });
    }
  }
}


var githubCount = function(username, reponame, cb) {
  if (_pool[username] && _pool[username][reponame]) {
    cb(null, _pool[username][reponame]);
    return;
  }
  var prefix = "https://api.github.com/repos/";
  var url = prefix + [username, reponame].join("/");
  async.parallel(githubApi(url), function(err, obj) {
    if (err) {
      cb(err);
    }
    var prCount = obj.pull_requests;
    // The GitHub API Issues count is actually issues + PRs
    // Substract PRs from this count to get an accurate count of regular issues
    var issuesCount = obj.issues - prCount;
    var contributorsCount = obj.contributors;
    _pool[username] = _pool[username] || {};
    _pool[username][reponame] = {
      pulls: prCount,
      issues: issuesCount,
      contributors: contributorsCount
    }
    cb(null, _pool);
  });
  githubApi(url, cb);
}

module.exports = githubCount;
