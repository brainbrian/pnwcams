/**
 * PNW Cams - http://www.pnwcams.com
 * Author: brian@brainbrian.com - http://www.brainbrian.com
 */

var PNWCAMS = PNWCAMS || {};

PNWCAMS.main = {
	config: {},
	init: function () {
		var self, carousel;
		self = this;

		// set up owl carousel
		carousel = $(".cameras").owlCarousel({
			items: 1,
			dots: true,
			lazyLoad: true,
			autoplay: false,
			autoplayTimeout: 8000,
			autoplayHoverPause: true,
			loop: true
		});
	},
	utilities: {
		cookie: {
			getCookie: function (name) {
				var nameEQ = name + "=";
				var ca = document.cookie.split(';');
				for (var i = 0; i < ca.length; i++) {
					var c = ca[i];
					while (c.charAt(0) == ' ') c = c.substring(1, c.length);
					if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
				}
				return null;
			},
			setCookie: function (name, value, days) {
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
		pageScroll: function (hash) {
			// Smooth Page Scrolling, update hash on complete of animation
			$('html,body').animate({
				scrollTop: $(hash).offset().top
			}, 'slow', function () {
				window.location = hash;
			});
		}
	}
};
