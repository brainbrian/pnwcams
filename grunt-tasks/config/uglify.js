module.exports = function(grunt) {
  return {
    dist: {
      files: [{
        src: '<%= publicPath %>/<%= jsOutputPath %>/vendor.js',
        dest: '<%= publicPath %>/<%= jsOutputPath %>/vendor.js'
      }, {
        src: '<%= publicPath %>/<%= jsOutputPath %>/<%= pkg.name %>.js',
        dest: '<%= publicPath %>/<%= jsOutputPath %>/<%= pkg.name %>.js'
      }]
    }
  };
};
