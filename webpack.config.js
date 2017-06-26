/**
 * Webpack Configuration
 * Checks node environment add requires to correct config
 * Config file locations `/webpack-config`
 */
module.exports = process.env.NODE_ENV === 'production' ? require('./webpack-config/prod.js')() : require('./webpack-config/dev.js')();
