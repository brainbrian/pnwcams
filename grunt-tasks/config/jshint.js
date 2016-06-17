module.exports = function(grunt) {
  return {
    options: {
      esnext: true,
      curly: false,
      eqeqeq: true,
      immed: true,
      latedef: true,
      loopfunc: true,
      newcap: true,
      noarg: true,
      sub: true,
      undef: true,
      boss: true,
      eqnull: true,
      browser: true,
      debug: true,
      globals: {
        'alert': true,
        'console': true,
        'document': true,
        'export': true,
        'import': true,
        'module': true,
        'require': true,
        'window': true,
        'Modernizr': true,
        'jQuery': true,
        '$': true,
        'TweenMax': true,
        'TweenLite': true,
        'TimelineMax': true,
        'TimelineLite': true,
        'Linear': true,
        'Back': true,
        'Cubic': true,
        'Quad': true,
        'Quart': true,
        'Quint': true,
        'Bounce': true,
        'Elastic': true,
        'Application': true,
        'ScrollMagic': true
      }
    },
    files: [
      '<%= sourcePath %>/scripts/**/*.js'
    ]
  };
};
