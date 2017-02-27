/*
 * grunt-simple-text
 * https://github.com/root/grunt-simple-text
 *
 * Copyright (c) 2017 Allyn Thomas
 * Licensed under the MIT license.
 */

'use strict';

var fs = require('fs');

module.exports = function(grunt) {

    // Please see the Grunt documentation for more information regarding task
    // creation: http://gruntjs.com/creating-tasks
    
    grunt.registerMultiTask('simple_text', 'Replace text with a key value from a json file', function() {
        // Merge task-specific and/or target-specific options with these defaults.
        var options = this.options({
            json: '',
            key: 'default',
            openBracket : '{',
            closeBracket : '}'
        });

        var jsonFile = options.json;
        var openBracket = options.openBracket;
        var closeBracket = options.closeBracket;
        var fileKey = options.key;
        var regexp = new RegExp(openBracket + "(.*?)" + closeBracket,"g");
        if(jsonFile){
            
            var jsonFileExists = grunt.file.exists(jsonFile);
            
            if(jsonFileExists){
                
                var jsonData = grunt.file.readJSON(jsonFile);
                jsonData = jsonData[fileKey];
                
                this.files.forEach(function (file) {
                    var src = file.src[0];
                    if (!src) {
                        return;
                    }
                    
                    var contents = grunt.file.read(src);
                    var extract = contents.matchAll(regexp);
                    
                    if(extract){
                        var extractLength = extract.length;

                        for(var i = 0; i < extractLength; i++){

                            var matchedRule = extract[i][0];
                            var matchedText = extract[i][1];
                            
                            

                            contents = contents.replace(matchedRule, jsonData[matchedText]);

                        }
                        
                        grunt.file.write(file.dest, contents);
                        grunt.log.writeln('Classes removed from ' + src + ', and saved to ' + file.dest);
                        
                    }else{
                        
                        grunt.file.write(file.dest, contents);
                        grunt.log.writeln('Classes removed from ' + src + ', and saved to ' + file.dest);
                        
                    }
                    
                });
                
                
            }else{
                grunt.log.writeln('Json file cannot be found.');
            }
            
        }else{
            grunt.log.writeln('No Json file set.');
        }
        
        
    });

};



String.prototype.matchAll = function(regexp) {
    var matches = [];
    this.replace(regexp, function() {
        var arr = ([]).slice.call(arguments, 0);
        var extras = arr.splice(-2);
        arr.index = extras[0];
        arr.input = extras[1];
        matches.push(arr);
  });
  return matches.length ? matches : null;
};

