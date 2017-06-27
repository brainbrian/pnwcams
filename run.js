/**
 * Webpack w/ React & HMR
 * This is a collection of configured Node JS tasks
 * Webpack w/ Node Docs - https://webpack.js.org/api/node/
 */

const fs = require('fs');
const del = require('del');
const ejs = require('ejs');
const chalk = require('chalk');
const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const webpackMerge = require('webpack-merge');
const tasks = new Map(); // collection of tasks
const distDir = './dist';

function run(task) {
  const start = new Date();
  console.log(`Starting '${task}'...`);
  return Promise.resolve().then(() => tasks.get(task)()).then(() => {
    console.log(`Finished '${task}' after ${new Date().getTime() - start.getTime()}ms`);
  }, err => console.error(err.stack));
}

/**
 * Clean the output directory
 */
tasks.set('clean', () => del(['dist/*'], {dot: true}));

/**
 * Create index.html from ejs template file and move to /dist folder
 * Effective JavaScript templating - http://ejs.co
 */
tasks.set('html', () => {
  const template = fs.readFileSync('./src/templates/index.ejs', 'utf8');
  const render = ejs.compile(template, {filename: './src/templates/index.ejs'});
  const output = render({env: process.env['NODE_ENV'], baseURL: 'http://www.pnwcams.com', bundle: './assets/js/app.bundle.js'});
  fs.writeFileSync(`${distDir}/index.html`, output, 'utf8');
});

/**
 * Bundle application with Webpack
 */
tasks.set('bundle', () => {
  const webpackConfig = require('./webpack.config');
  return new Promise((resolve, reject) => {
    webpack(webpackConfig).run((err, stats) => {
      if (err) {
        reject(err);
      } else {
        console.log(stats.toString(webpackConfig.stats));
        resolve();
      }
    });
  });
});

/**
 * Run production build task
 */
tasks.set('build', () => {
  process.env['NODE_ENV'] = 'production';
  return Promise.resolve()
    .then(() => run('clean'))
    .then(() => run('bundle'))
    .then(() => run('html'));
});

/**
 * Run react app with webpack-dev-server (default task)
 * https://webpack.js.org/configuration/dev-server/
 * https://webpack.github.io/docs/webpack-dev-server.html
 * Dev server settins in webpack-config/dev.js
 */
tasks.set('start', () => {
  return run('clean').then(() => new Promise(resolve => {
    const webpackConfig = require('./webpack.config');
    const compiler = webpack(webpackConfig);
    const webpackServer = new WebpackDevServer(compiler, webpackMerge(webpackConfig.devServer, {stats: webpackConfig.stats}));
    webpackServer.listen(webpackConfig.devServer.port);
    console.log(chalk.bgMagenta(`Server: http://${webpackConfig.devServer.host}:${webpackConfig.devServer.port}`));
    // create directory if it does not exist
    if (!fs.existsSync(distDir)){
      fs.mkdirSync(distDir);
    }
    // when complete generate html and resolve promise
    compiler.plugin('done', () => {
      run('html').then(() => {
        resolve;
      });
    });
  }));
});

/**
 * Execute the run method with either the `start` default task or the task specified
 */
run(/^\w/.test(process.argv[2] || '') ? process.argv[2] : 'start');
