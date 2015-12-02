var remapify = require('remapify');

module.exports = function(grunt) {
  // list all aliases
  var aliases = [{
    cwd: './src/templates',
    src: './**/*.hbs',
    expose: 'templates'
  }, {
    cwd: './src/scripts/modules',
    src: './**/*.js',
    expose: 'modules'
  }, {
    cwd: './src/scripts/lib',
    src: './**/*.js',
    expose: 'lib'
  }];
  return {
    dev: {
      src: '<%= sourcePath %>/scripts/init.js',
      dest: '<%= localPath %>/<%= jsOutputPath %>/<%= pkg.name %>.js',
      options: {
        preBundleCB: function(b) {
          b.plugin(remapify, aliases);
        },
        browserifyOptions: {
          extensions: ['.hbs'],
          fullPaths: false
        },
        debug: true
      }
    },
    dist: {
      src: '<%= sourcePath %>/scripts/init.js',
      dest: '<%= distPath %>/<%= jsOutputPath %>/<%= pkg.name %>.js',
      options: {
        preBundleCB: function(b) {
          b.plugin(remapify, aliases);
        },
        browserifyOptions: {
          extensions: ['.hbs'],
          fullPaths: false
        },
        debug: false
      }
    }
  };
};
