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
            closeBracket : '}',
            defaultKey : ''
        });

        var jsonFiles = []; // String or array of files to parse as json
        var openBracket = options.openBracket; //the opening bracket to check for
        var closeBracket = options.closeBracket; //the closing bracket to check for
        var fileKey = options.key; //the key for the values to be used in replacing
        var defaultKey = options.defaultKey; //the default key for values no overridden by the filekey
        var regexp = new RegExp(openBracket + "(.*?)" + closeBracket,"g"); //match all regex between opening and closing brackets
        
        //check if one or more json files need to be parsed.
        if(options.json.constructor === Array){
            jsonFiles = options.json;
        }else{
            if(options.json !== ''){
                jsonFiles = [options.json];
            }
        }
        
        var allJson = {}; //all json compiled into a single variable
        
        if(jsonFiles.length == 0){
            grunt.log.writeln('No Json files set.');
        }
        
        for(var i = 0; i < jsonFiles.length; i++){
            
            var jsonFile = jsonFiles[i];
            
            if(jsonFile){
            
                var jsonFileExists = grunt.file.exists(jsonFile);

                if(jsonFileExists){

                    var jsonData = grunt.file.readJSON(jsonFile); //current json file being parsed
                    var setJson = {};

                    if(defaultKey == ''){ //check if default key has been set
                        if(jsonData[fileKey]){ //if it hasn't try the overriding filekey
                            setJson = jsonData[fileKey];
                        }else{
                            grunt.log.writeln('Key not found.');
                            return;
                        }
                    }else{
                        if(jsonData[defaultKey]){

                            var defaultJson = jsonData[defaultKey];
                            var overrideJson = {};
                            if(jsonData[fileKey]){
                                overrideJson = jsonData[fileKey];
                            }
                            for(var key in overrideJson){

                                defaultJson[key] = overrideJson[key];

                            }

                            setJson = defaultJson;

                        }else{
                            if(jsonData[fileKey]){
                                setJson = jsonData[fileKey];
                            }else{
                                grunt.log.writeln('Key "' + fileKey + '" not found in file "' + jsonFile + '".');
                                return;
                            }
                        }
                    }
                    
                    if(setJson){ //add parsed json data into all json var
                        for(var key in setJson){
                            allJson[key] = setJson[key];
                        }
                    }
                    
                }else{
                    grunt.log.writeln('Json file "' + jsonFile + '" cannot be found.');
                }
                
            }else{
                grunt.log.writeln('Json empty.');
            }
            
        }

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


                    if(matchedRule !== undefined && matchedText !== undefined){
                        if(allJson[matchedText]){
                            contents = contents.replace(matchedRule, allJson[matchedText]);
                        }
                    }

                }

                grunt.file.write(file.dest, contents);
                grunt.log.writeln('Text from ' + src + ' saved to ' + file.dest);

            }else{

                grunt.file.write(file.dest, contents);
                grunt.log.writeln('Text from ' + src + ' saved to ' + file.dest);

            }

        });
        
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

