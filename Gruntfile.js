module.exports = function(grunt) {
  var path = require('path');
  var cwd = process.cwd();
  var pkg = grunt.file.readJSON('package.json');
  var localPath = 'local';
  var distPath = 'dist';

  grunt.loadTasks('grunt-tasks/');

  require('load-grunt-config')(grunt, {
    configPath: path.join(cwd, 'grunt-tasks/config'),
    init: true,
    config: {
      pkg: pkg,
      metaTitle: pkg.title,
      pkgDesc: pkg.description,
      assetName: pkg.name,
      localPath: grunt.option('localPath') || localPath,
      distPath: grunt.option('distPath') || distPath,
      uiDir: 'assets',
      jsOutputPath: '<%= uiDir %>/scripts',
      cssOutputPath: '<%= uiDir %>/styles',
      sourcePath: './src',
      vendorPath: '<%= sourcePath %>/vendor',
      port: 8000,
      livereloadPort: 35729
    },
    'loadGruntTasks': {
      scope: 'devDependencies',
      pattern: ['grunt-*'],
      package: require('./package.json')
    }
  });

  grunt.registerTask('build', 'Generate build', function(target) {
    if (target !== 'dev') target = 'dist';
    var tasks = [
      'clean:' + target,
      'includereplace:' + target,
      'sass:' + target,
      'autoprefixer:' + target,
      'copy:' + target,
      'jshint',
      'concat:' + target + 'libs',
      'browserify:' + target
    ];
    if (target === 'dist') {
      tasks.push('cssmin');
      tasks.push('uglify');
    }
    grunt.task.run(tasks);
  });

  grunt.registerTask('run', ['build:dev', 'connect', 'watch']);
};
