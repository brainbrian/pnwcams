module.exports = function(grunt) {
  return {
    dist: {
      files: [{
        src: '<%= distPath %>/<%= cssOutputPath %>/<%= pkg.name %>.css',
        dest: '<%= distPath %>/<%= cssOutputPath %>/<%= pkg.name %>.css'
      }]
    }
  };
};
