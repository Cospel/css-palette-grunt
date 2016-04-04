# grunt-css_paletove_plugin

> The best Grunt plugin ever.

## Getting Started
This plugin requires Grunt `~0.4.5`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-css_paletove_plugin --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-css_paletove_plugin');
```

## The "css_paletove_plugin" task

### Overview
In your project's Gruntfile, add a section named `css_paletove_plugin` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  css_paletove_plugin: {
    options: {
      // Task-specific options go here.
      base: 'base.css'  // PATH to base file
    },
    your_target: {
      // Target-specific file lists and/or options go here.
      files : [{ src: ['css/palette/*.css'], dest: 'css/result/' }]
    },
  },
});
```

### Options

#### options.base
Type: `String`
Default value: `'base.css'`

A string value that is used to do specify path to base file.

### Usage Examples

#### Default Options
In this example, the default options are used to do something with whatever.

```js
grunt.initConfig({
  css_paletove_plugin: {
    options: { base : 'path/to/file/base.css' },
    files:  [{ src: ['css/palette/*.css'], dest: 'css/result/' }]
  },
});
```

#### Custom Options
In this example, custom options are used to do something else with whatever else.

```js
grunt.initConfig({
  css_paletove_plugin: {
    options: {
    },
    files: {
    },
  },
});
```

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History
_(Nothing yet)_
