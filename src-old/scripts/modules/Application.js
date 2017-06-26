import linksTemplate from 'templates/links.hbs';
import locationTemplate from 'templates/location.hbs';
import weatherTemplate from 'templates/weather.hbs';
import _ from 'underscore';

/**
 * PNW Cams - http://www.pnwcams.com
 * @module  modules/Application
 * @author  brian@brainbrian.com - http://www.brainbrian.com
 */
const Application = {
  /**
   * Configuration for application
   * @type {Object}
   */
  config: {
    data: null,
    snowApi: 'http://forecast.weather.gov/MapClick.php?FcstType=json',
    surfApi: 'http://api.openweathermap.org/data/2.5/weather?units=imperial&appid=aedd7de81c14d670e877d39ead4ed7b4'
  },

  /**
   * User interface object for caching DOM elements
   * @type {Object}
   */
  ui: {},

  /**
   * Initialize the application
   */
  init: function() {
    this.ui = {
      links: $('#links'),
      locations: $('#locations'),
      location: null,
      navBtns: $('.header__nav-btn'),
      cameras: null
    };
    this._requestData();
  },

  /**
   * Request json data for locations
   */
  _requestData: function() {
    $.ajax({
      dataType: "json",
      url: '/assets/json/data.json',
      success: function(data) {
        var hash = window.location.hash.replace('#', '');
        var cat = 'surf';
        if(hash === 'snow' || hash === 'surf') cat = hash;
        this.config.data = data;
        this.config.category = cat;
        this._bindEvents();
        if(this.config.data.links) this._buildLinks(this.config.data.links, cat);
        if(this.config.data.locations) this._buildLocations(this.config.data.locations, cat);
      }.bind(this)
    });
  },

  /**
   * Bind event listeners for nav items
   */
  _bindEvents: function() {
    this.ui.navBtns.on('click', function(e) {
      var target = e.target,
        $parent = $(target).parent(),
        cat = $parent.data('cat');
      if(this.config.category !== cat) {
          this.config.category = cat;
          this._buildLinks(this.config.data.links, cat);
          this._buildLocations(this.config.data.locations, cat);
      }
    }.bind(this));
  },

  /**
   * Build links based on data
   * @param  {[type]} data     Link data
   * @param  {[type]} category Link category
   */
  _buildLinks: function(data, category) {
    var linksHtml;
    if(category === 'surf') {
      linksHtml = linksTemplate({'links': _.where(data, {category: "surf"})});
    } else {
      // default to snow
      linksHtml = linksTemplate({'links': _.where(data, {category: "snow"})});
    }
    this.ui.links.html('');
    this.ui.links.html(linksHtml);
  },

  /**
   * Build locations based on data
   * @param  {[type]} data     Location data
   * @param  {[type]} category Location category
   */
  _buildLocations: function(data, category) {
    var locationHtml;
    this.ui.navBtns.removeClass('header__nav-btn--active');
    if(category === 'snow') {
      locationHtml = locationTemplate({'locations': _.where(data, {category: "snow"})});
      $('.header__nav-btn[data-cat="snow"]').addClass('header__nav-btn--active');
    } else {
      // default to surf
      locationHtml = locationTemplate({'locations': _.where(data, {category: "surf"})});
      $('.header__nav-btn[data-cat="surf"]').addClass('header__nav-btn--active');
    }
    this._destroyCarousels();
    this.ui.locations.html('');
    this.ui.locations.html(locationHtml);
    this.ui.location = this.ui.locations.find('.location');
    this.ui.cameras = this.ui.locations.find('.cameras');
    this._randomImgLoad();
    this._buildWeather();
    this._buildCarousels();
    document.body.scrollTop = 0;
  },

  /**
   * Make images load randomly to prevent caching
   */
  _randomImgLoad: function() {
      var $images = $('.owl-lazy');
      $images.each(function(index) {
          var $image = $($images[index]);
          var imgUrl = $image.data('src');
          imgUrl = imgUrl.indexOf('?') > -1 ? imgUrl + '&' : imgUrl + '?';
          imgUrl += "random=" + Math.round(Math.random() * 100000000);
          $image.attr('data-src', imgUrl);
      }.bind(this));
  },

  /**
   * Build weather data for each location
   */
  _buildWeather: function() {
    this.ui.location.each(function(index) {
      var $location = $(this.ui.location[index]);
      var latitude = String($location.data('latitude'));
      var longitude = String($location.data('longitude'));
      var requestData = {
        lat: latitude,
        lon: longitude
      };
      var apiUrl = this.config.snowApi;
      if(this.config.category === 'surf') apiUrl = this.config.surfApi;
      var addWeatherData = function(data) {
        var $titleCard = $(this.ui.location[index]).find('.title-card__vertical-align');
        var forecastUrl = 'http://forecast.weather.gov/MapClick.php?lat=' + latitude + '&lon=' + longitude;
        // define weather data obj
        var weatherData = {
          forecastUrl: forecastUrl
        };
        // build weather data object based on category and returned data
        if(this.config.category === 'surf') {
          if(data.main && data.main.temp) weatherData.temp = data.main.temp;
          if(data.wind) {
            if(data.wind.speed) weatherData.windSpeed = data.wind.speed;
            if(data.wind.deg) weatherData.windDirection = this.degToCompass(data.wind.deg);
          }
          if(data.rain && data.rain['3h']) weatherData.rain = data.rain['3h'];
          if(data.snow && data.snow['3h']) weatherData.snow = data.snow['3h'];
          if(data.weather && data.weather.length > 0 && data.weather[0].description) weatherData.description = data.weather[0].description; // or .main (shorter desc)
        } else {
          if(data.data) {
            if(data.data.temperature && data.data.temperature.length > 0 && data.data.temperature[0] !== 'NA') weatherData.temp = data.data.temperature[0];
            if(data.data.weather && data.data.weather.length > 0) weatherData.description = data.data.weather[0];
          }
          if(data.currentobservation) {
            if(data.currentobservation.Winds && data.currentobservation.Winds !== 'NA') weatherData.windSpeed = data.currentobservation.Winds;
            if(data.currentobservation.Windd && data.currentobservation.Windd !== 'NA') weatherData.windDirection = this.degToCompass(data.currentobservation.Windd);
          }
          if(data.location && data.location.elevation && data.location.elevation !== 'NA') weatherData.elevation = data.location.elevation;
        }
        // build and add html
        var weatherHtml = weatherTemplate(weatherData);
        $titleCard.append(weatherHtml);
      };
      $.ajax({
        cache: true,
        context: this,
        data: requestData,
        dataType: "jsonp",
        url: apiUrl,
        success: addWeatherData
      });
    }.bind(this));
  },

  /**
   * Build Owl Carousels
   */
  _buildCarousels: function() {
    this.ui.cameras.each(function(index) {
      var $carousel = $(this.ui.cameras[index]);
      var $camera = $carousel.find('.camera');
      var settings = {};
      // console.log($camera.length);
      if($camera.length > 1) {
        // set up owl carousels
        settings = {
          items: 1,
          dots: true,
          lazyLoad: true,
          autoplay: false,
          autoplayTimeout: 8000,
          autoplayHoverPause: true,
          loop: true
        };
      } else {
        // set up owl carousels
        settings = {
          items: 1,
          dots: false,
          lazyLoad: true,
          autoplay: false,
          loop: false
        };
      }
      // set up owl carousels
      $carousel.owlCarousel(settings);
    }.bind(this));
  },

  /**
   * Destroy Owl Carousels
   */
  _destroyCarousels: function() {
      if(this.ui.cameras !== null) this.ui.cameras.trigger('destroy.owl.carousel');
  },

  /**
   * Convert direction in degrees to human readable value
   * @param  {Number} num Direction in degrees
   * @return {String}     String value of direction
   */
  degToCompass: function(num) {
    var val = Math.floor((num / 22.5) + 0.5);
    var arr = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW'];
    return arr[(val % arr.length)];
  }
};

export default Application;
