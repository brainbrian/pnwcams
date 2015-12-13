import locationTempalte from 'templates/location.hbs';
import _ from 'underscore';

/**
 * PNW Cams - http://www.pnwcams.com
 * Author: brian@brainbrian.com - http://www.brainbrian.com
 */

const Application = {
  config: {
    data: null
  },
  ui: {},

  init: function() {
    this._requestData();
    this.ui = {
      locations: $('#locations'),
      navBtns: $('.header__nav-btn'),
      cameras: null
    };
  },

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

  _bindEvents: function() {
    this.ui.navBtns.on('click', function(e) {
      var target = e.target,
        $parent = $(target).parent(),
        category = $parent.data('cat');
      if(this.config.category !== category) this._buildLocations(this.config.data, category);
    }.bind(this));
  },

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
  },

  _randomImgLoad: function() {
      var $cameras = $('.camera');
      $cameras.each(function(index) {
          var $camera = $($cameras[index]);
          var imgUrl = $camera.data('src');
          imgUrl += "?random=" + Math.round(Math.random() * 100000000);
          $camera.attr('data-src', imgUrl);
      }.bind(this));
  },

  _buildCarousels: function() {
      // set up owl carousels
      this.ui.cameras.owlCarousel({
        items: 1,
        dots: true,
        lazyLoad: true,
        autoplay: false,
        autoplayTimeout: 8000,
        autoplayHoverPause: true,
        loop: true
      });
  },

  _destroyCarousels: function() {
      if(this.ui.cameras !== null) this.ui.cameras.trigger('destroy.owl.carousel');
  },

  utilities: {
    cookie: {
      getCookie: function(name) {
        var nameEQ = name + "=";
        var ca = document.cookie.split(';');
        for (var i = 0; i < ca.length; i++) {
          var c = ca[i];
          while (c.charAt(0) === ' ') c = c.substring(1, c.length);
          if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
        }
        return null;
      },

      setCookie: function(name, value, days) {
        var date, expires;
        if (days) {
          date = new Date();
          date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
          expires = "; expires=" + date.toGMTString();
        } else {
          expires = "";
        }
        document.cookie = name + "=" + value + expires + "; path=/";
      }
    },

    pageScroll: function(hash) {
      // Smooth Page Scrolling, update hash on complete of animation
      $('html,body').animate({
        scrollTop: $(hash).offset().top
      }, 'slow', function() {
        window.location = hash;
      });
    }
  }
};

export default Application;
