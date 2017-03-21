# grunt-simple-text

> Replace text with a key value from a json file

## Getting Started
This plugin requires Grunt `~0.4.5`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-simple-text --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-simple-text');
```

## The "simple_text" task

### Overview
In your project's Gruntfile, add a section named `simple_text` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  simple_text: {
    options: {
      json: 'path/to/file.json',
      key: 'default',
      openBracket : '{',
      closeBracket : '}'
    },
    your_target: {
      files : {
        "path/save/file.html" : "path/process/file.html"
      }
    },
  },
});
```

### Options

#### options.json
Type: `String`
Default value: `''`

Path to json file containing the strings that can be added to your files.

#### options.key
Type: `String`
Default value: `'default'`

Key in json has multiple text sources for the same text identifiers. This can come in handy if using different text for different release platforms.

#### options.openBracket
Type: `String`
Default value: `'{'`

Open bracket symbol to identify the key name to get the string value.

#### options.closeBracket
Type: `String`
Default value: `'}'`

Close bracket symbol to identify the key name to get the string value.

### Usage Examples

#### Custom Options
This example will take the file.html and check for any strings between {}, these will be used as keys to get any values from the parent key 'Default' in the file.json.

```js
grunt.initConfig({
  simple_text: {
    main : {
      options: {
        json: 'path/to/file.json',
        key: 'default',
        openBracket : '{',
        closeBracket : '}'
      },
      files: {
        'dest/output.html': ['src/orig/file.html'],
      }
    }
  }
});
```

If file.html has the contents

```html
<div class="textItem">
  <p>{LongText}</p>
</div>
```

and file.json has the contents

```js
{
  "default" : {
    "LongText" : "Lorem ipsum dolor sit amet, consectetur adipiscing elit."
  },
  "release" : {
    "LongText" : "Actual long text for release."
  }
}
```

then output.html will save with

```html
<div class="textItem">
  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
</div>
```

If the key option had been set to release, the output.html file would have this as it's contents

```html
<div class="textItem">
  <p>Actual long text for release.</p>
</div>
```

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History
_(Nothing yet)_
