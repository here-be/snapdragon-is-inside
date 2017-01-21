'use strict';

require('mocha');
var assert = require('assert');
var snapdragonIsInside = require('..');

describe('snapdragon-is-inside', function() {
      it('should export a function', function() {
    assert.equal(typeof snapdragonIsInside, 'function');
  });

    it('should export an object', function() {
    assert(snapdragonIsInside);
    assert.equal(typeof snapdragonIsInside, 'object');
  });

  it('should throw an error when invalid args are passed', function(cb) {
  try {
    snapdragonIsInside();
    cb(new Error('expected an error'));
  } catch (err) {
    assert(err);
    assert.equal(err.message, 'expected first argument to be a string');
    assert.equal(err.message, 'expected callback to be a function');
    cb();
  }
});

});
