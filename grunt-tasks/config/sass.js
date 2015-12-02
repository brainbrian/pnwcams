module.exports = function(grunt) {
  return {
    dev: {
      options: {
        sourcemap: 'auto',
        style: 'expanded',
        debug: true,
        trace: true
      },
      files: [{
        src: '<%= sourcePath %>/styles/app.scss',
        dest: '<%= localPath %>/<%= cssOutputPath %>/<%= pkg.name %>.css'
      }]
    },
    dist: {
      options: {
        sourcemap: 'none',
        style: 'expanded',
        debug: false,
        trace: false
      },
      files: [{
        src: '<%= sourcePath %>/styles/app.scss',
        dest: '<%= distPath %>/<%= cssOutputPath %>/<%= pkg.name %>.css'
      }]
    }
  };
};
