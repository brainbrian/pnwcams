import locationTempalte from 'templates/location.hbs';
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
    data: null
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
      locations: $('#locations'),
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
        var cat = 'snow';
        if(hash === 'snow' || hash === 'surf') cat = hash;
        this.config.data = data;
        this._bindEvents();
        this._buildLocations(this.config.data, cat);
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
        category = $parent.data('cat');
      if(this.config.category !== category) this._buildLocations(this.config.data, category);
    }.bind(this));
  },

  /**
   * Build locations based on data
   * @param  {[type]} data     Location data
   * @param  {[type]} category Location category
   */
  _buildLocations: function(data, category) {
    var locationHtml;
    this.ui.navBtns.removeClass('header__nav-btn--active');
    if(category === 'surf') {
      locationHtml = locationTempalte({'locations': _.where(data.locations, {category: "surf"})});
      $('.header__nav-btn[data-cat="surf"]').addClass('header__nav-btn--active');
    } else {
      // default to snow
      locationHtml = locationTempalte({'locations': _.where(data.locations, {category: "snow"})});
      $('.header__nav-btn[data-cat="snow"]').addClass('header__nav-btn--active');
    }
    this._destroyCarousels();
    this.ui.locations.html('');
    this.ui.locations.html(locationHtml);
    this.ui.cameras = this.ui.locations.find('.cameras');
    this._randomImgLoad();
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
  }
};

export default Application;
