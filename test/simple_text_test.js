'use strict';

var grunt = require('grunt');

/*
  ======== A Handy Little Nodeunit Reference ========
  https://github.com/caolan/nodeunit

  Test methods:
    test.expect(numAssertions)
    test.done()
  Test assertions:
    test.ok(value, [message])
    test.equal(actual, expected, [message])
    test.notEqual(actual, expected, [message])
    test.deepEqual(actual, expected, [message])
    test.notDeepEqual(actual, expected, [message])
    test.strictEqual(actual, expected, [message])
    test.notStrictEqual(actual, expected, [message])
    test.throws(block, [error], [message])
    test.doesNotThrow(block, [error], [message])
    test.ifError(value)
*/

exports.simple_text = {
  setUp: function(done) {
    // setup here if necessary
      
    done();
  },
  array_options: function(test) {
    test.expect(1);

    var actual = grunt.file.read('tmp/array_options');
    var expected = grunt.file.read('test/expected/array_options');
    test.equal(actual, expected, ' not printing updated text as expected.');

    test.done();
  },
  string_options: function(test) {
    test.expect(1);

    var actual = grunt.file.read('tmp/string_options');
    var expected = grunt.file.read('test/expected/string_options');
    test.equal(actual, expected, ' not printing updated text as expected.');

    test.done();
  }
};
