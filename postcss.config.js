module.exports = {
  plugins: [
    require('postcss-smart-import')({}),
    require('precss')({}),
    require('postcss-strip-inline-comments')({}),
    require('autoprefixer')({browsers: ['last 6 versions', 'ie 10', 'Firefox 30']})
  ]
};
