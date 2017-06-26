# PNW Cams
Application code for [pnwcams.com](http://www.pnwcams.com)

I'm building this tool for myself to see webcams around the Pacific Northwest that I check on a regular basis. I hope you find it useful too!

– [Brian](http://www.brainbrian.com)

## Built w/ Webpack and React

[React](https://facebook.github.io/react/) w/ Hot Module Replacement and production bundle for pnwcams.

Adapted from the [Hot Module Replacement](https://webpack.js.org/guides/hmr-react/) and [Building for Production](https://webpack.js.org/guides/production-build/) guides on [webpack.js.org](https://webpack.js.org).

## Install
Download the repository.

Install the NPM module dependancies<br>
`$ npm install`

## Development Server
After the required node modules are installed you can run a local development build with hot module replacement by running<br>
`$ npm start` or `$ npm start --verbose` for verbose.

This build will be located in the git ignored directory `dist`. You will only see the static resources and not the compiled js/assets. These will only exist in memory.

## Production Build
A static production build can be created by running<br>
`$ npm run build` or `$ npm run build --verbose` for verbose.

These static production build files can be seen in `dist`.

## Webpack Configuration
Configuration of the Webpack build is located in `webpack-config`. Here you will find the shared config in `webpack-config/base.js`. The development specific configuration settings are in `webpack-config/dev.js` and the production specific settings in `webpack-config/prod.js`. The npm script `build` outputs a static build to the `dist` folder, which is ignored in git.

## Weather Services Used
* [NOAA](http://forecast.weather.gov/MapClick.php?lat=46.80&lon=-121.73&FcstType=json)
* [OpenWeatherMap](http://api.openweathermap.org/data/2.5/weather?lat=46.80&lon=-121.73)

## Todo
* Add support for video feeds like [this](https://www.youtube.com/watch?v=00CSlKmSvwU)
* Build App w/ React Native
