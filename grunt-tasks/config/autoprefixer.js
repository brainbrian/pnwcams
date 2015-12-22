module.exports = function(grunt) {
  return {
    dev: {
      options: {
        browsers: ['last 6 versions', 'ie 9'],
        map: true
      },
      files: [{
        src: '<%= localPath %>/<%= cssOutputPath %>/<%= pkg.name %>.css',
        dest: '<%= localPath %>/<%= cssOutputPath %>/<%= pkg.name %>.css'
      }]
    },
    dist: {
      options: {
        browsers: ['last 6 versions', 'ie 9'],
        map: false
      },
      files: [{
        src: '<%= distPath %>/<%= cssOutputPath %>/<%= pkg.name %>.css',
        dest: '<%= distPath %>/<%= cssOutputPath %>/<%= pkg.name %>.css'
      }]
    }
  };
};
