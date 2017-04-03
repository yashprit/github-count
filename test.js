'use strict';
var 
  assert = require('assert'),
  githubUsername = require('./');

it('should get GitHub various count based on username and repo', function(done) {
  this.timeout(20000);

  githubUsername('yashprit', 'generator-bode', function(err, count) {
    if (err) {
      console.error(err);
      assert(false);
    }

    assert.deepEqual(count, {
      'yashprit': {
        'generator-bode': {
          pulls: 0,
          issues: 10,
          contributors: 1
        }
      }
    });
    done();
  });
});
