module.exports = function(grunt) {
  return {
    dist: {
      files: [{
        src: '<%= distPath %>/<%= jsOutputPath %>/vendor.js',
        dest: '<%= distPath %>/<%= jsOutputPath %>/vendor.js'
      }, {
        src: '<%= distPath %>/<%= jsOutputPath %>/<%= pkg.name %>.js',
        dest: '<%= distPath %>/<%= jsOutputPath %>/<%= pkg.name %>.js'
      }]
    }
  };
};
