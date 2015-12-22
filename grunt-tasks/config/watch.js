module.exports = function(grunt) {
  return {
    options: {
      livereload: '<%= livereloadPort %>',
      spawn: false
    },
    html: {
      files: [
        '<%= sourcePath %>/html/**/*.html',
        '!<%= sourcePath %>/html/includes/*.html'
      ],
      tasks: ['newer:includereplace:dev']
    },
    htmlIncludes: {
      files: ['<%= sourcePath %>/html/includes/*.html'],
      tasks: ['includereplace:dev']
    },
    styles: {
      files: [
        '<%= sourcePath %>/styles/**/*.scss'
      ],
      tasks: ['autoprefixer:dev', 'sass:dev']
    },
    scripts: {
      files: [
        '<%= sourcePath %>/scripts/**/*.js'
      ],
      tasks: ['newer:jshint', 'browserify:dev']
    },
    vendor: {
      files: [
        '<%= sourcePath %>/vendor/**/*'
      ],
      tasks: ['concat:vendor_dev']
    },
    assets: {
      files: [
        '<%= sourcePath %>/assets/**/*'
      ],
      tasks: ['newer:copy:assets']
    }
  };
};
