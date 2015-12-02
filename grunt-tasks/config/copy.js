module.exports = function(grunt) {
  return {
    assets: {
      files: [
        {
          expand: true,
          src: ['**/*.*'],
          cwd: '<%= sourcePath %>/assets/',
          dest: '<%= localPath %>/<%= uiDir %>'
        }
      ]
    },
    data: {
      files: [
        {
          expand: true,
          src: ['**/*.json'],
          cwd: '<%= sourcePath %>/data/',
          dest: '<%= localPath %>/api/'
        }
      ]
    },
    dev: {
      files: [{
        expand: true,
        src: ['**/*.*'],
        cwd: '<%= sourcePath %>/assets/',
        dest: '<%= localPath %>/<%= uiDir %>'
      }, {
        expand: true,
        src: ['**/*.json'],
        cwd: '<%= sourcePath %>/data/',
        dest: '<%= localPath %>/api/'
      }, {
        expand: true,
        src: ['*.ico'],
        cwd: '<%= sourcePath %>/html/',
        dest: '<%= localPath %>/'
      }]
    },
    dist: {
      files: [{
        expand: true,
        src: ['**/*.*'],
        cwd: '<%= sourcePath %>/assets/',
        dest: '<%= distPath %>/<%= uiDir %>'
      }, {
        expand: true,
        src: ['**/*.json'],
        cwd: '<%= sourcePath %>/data/',
        dest: '<%= distPath %>/api/'
      }, {
        expand: true,
        src: ['*.ico'],
        cwd: '<%= sourcePath %>/html/',
        dest: '<%= distPath %>'
      }]
    }
  };
};
