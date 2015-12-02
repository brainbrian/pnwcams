module.exports = function(grunt) {
  return {
    options: {
      globals: {
        "meta-title": "<%= metaTitle %>",
        "meta-desc": "<%= pkgDesc %>",
        "asset-name": "<%= assetName %>",
        "root-path": "/",
        "img-path": "/assets/images/",
        "styles-path": "/assets/styles/",
        "scripts-path": "/assets/scripts/"
      },
      includesDir: '<%= sourcePath %>/html/inlcludes',
      prefix: '@@',
      suffix: '@@'
    },
    dev: {
      files: [{
        cwd: '<%= sourcePath %>/html',
        src: ['**/*.html', '!_includes/*.html'],
        dest: '<%= localPath %>/',
        expand: true
      }]
    },
    dist: {
      files: [{
        cwd: '<%= sourcePath %>/html',
        src: ['**/*.html', '!_includes/*.html'],
        dest: '<%= distPath %>/',
        expand: true
      }]
    }
  };
};
