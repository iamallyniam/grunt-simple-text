/*
 * grunt-simple-text
 * https://github.com/root/grunt-simple-text
 *
 * Copyright (c) 2017 Allyn Thomas
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({

    // Before generating any new files, remove any previously-created files.
    clean: {
      tests: ['tmp']
    },

    // Configuration to be run (and then tested).
    simple_text: {
      custom_options: {
        options: {
          json: ['testData/jsonFile1.json', 'testData/jsonFile2.json'],
          key: 'new',
          defaultKey: 'df',
          openBracket : '{',
          closeBracket : '}'
        },
        files: {
          'tmp/custom_options': 'test/fixtures/customer_options'
        }
      }
    },

    // Unit tests.
    nodeunit: {
      tests: ['test/*_test.js']
    }

  });

  // Actually load this plugin's task(s).
  grunt.loadTasks('tasks');

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-nodeunit');

  // Whenever the "test" task is run, first clean the "tmp" dir, then run this
  // plugin's task(s), then test the result.
  grunt.registerTask('test', ['clean', 'simple_text', 'nodeunit']);

  // By default, lint and run all tests.
  grunt.registerTask('default', ['test']);

};
