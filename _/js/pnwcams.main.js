/**
 * PNW Cams - http://www.pnwcams.com
 * Author: brian@brainbrian.com - http://www.brainbrian.com
 */

var PNWCAMS = PNWCAMS || {};

PNWCAMS.main = {
	config: {},
	init: function () {
		var self, controller, tween, scene;
		self = this;
		controller = new ScrollMagic({vertical: true});
		// set up scenes/tweens
		tween = new TweenMax.to("#photo1", 1, {top: "-50%", display: 'block', ease: Linear.easeNone});
		scene = new ScrollScene({triggerElement: "#title1", duration: $(window).height()*2}).setTween(tween).addTo(controller);

		tween = new TweenMax.to("#photo2", 1, {top: "-50%", display: 'block', ease: Linear.easeNone});
		scene = new ScrollScene({triggerElement: "#title2", duration: $(window).height()*2}).setTween(tween).addTo(controller);

		tween = new TweenMax.to("#photo3", 1, {top: "-50%", display: 'block', ease: Linear.easeNone});
		scene = new ScrollScene({triggerElement: "#title3", duration: $(window).height()*2}).setTween(tween).addTo(controller);

		tween = new TweenMax.to("#photo4", 1, {top: "-50%", display: 'block', ease: Linear.easeNone});
		scene = new ScrollScene({triggerElement: "#title4", duration: $(window).height()*2}).setTween(tween).addTo(controller);

		tween = new TweenMax.to("#photo5", 1, {top: "-50%", display: 'block', ease: Linear.easeNone});
		scene = new ScrollScene({triggerElement: "#title5", duration: $(window).height()*2}).setTween(tween).addTo(controller);

		tween = new TweenMax.to("#photo6", 1, {top: "-50%", display: 'block', ease: Linear.easeNone});
		scene = new ScrollScene({triggerElement: "#title6", duration: $(window).height()*2}).setTween(tween).addTo(controller);

		tween = new TweenMax.to("#photo7", 1, {top: "-50%", display: 'block', ease: Linear.easeNone});
		scene = new ScrollScene({triggerElement: "#title7", duration: $(window).height()*2}).setTween(tween).addTo(controller);

		tween = new TweenMax.to("#photo8", 1, {top: "-50%", display: 'block', ease: Linear.easeNone});
		scene = new ScrollScene({triggerElement: "#title8", duration: $(window).height()*2}).setTween(tween).addTo(controller);

		tween = new TweenMax.to("#photo9", 1, {top: "-50%", display: 'block', ease: Linear.easeNone});
		scene = new ScrollScene({triggerElement: "#title9", duration: $(window).height()*2}).setTween(tween).addTo(controller);

		tween = new TweenMax.to("#photo10", 1, {top: "-50%", display: 'block', ease: Linear.easeNone});
		scene = new ScrollScene({triggerElement: "#title10", duration: $(window).height()*2}).setTween(tween).addTo(controller);

		tween = new TweenMax.to("#photo11", 1, {top: "-50%", display: 'block', ease: Linear.easeNone});
		scene = new ScrollScene({triggerElement: "#title11", duration: $(window).height()*2}).setTween(tween).addTo(controller);

		tween = new TweenMax.to("#photo12", 1, {top: "-50%", display: 'block', ease: Linear.easeNone});
		scene = new ScrollScene({triggerElement: "#title12", duration: $(window).height()*2}).setTween(tween).addTo(controller);

		tween = new TweenMax.to("#photo13", 1, {top: "-50%", display: 'block', ease: Linear.easeNone});
		scene = new ScrollScene({triggerElement: "#title13", duration: $(window).height()*2}).setTween(tween).addTo(controller);

		tween = new TweenMax.to("#photo14", 1, {top: "-50%", display: 'block', ease: Linear.easeNone});
		scene = new ScrollScene({triggerElement: "#title14", duration: $(window).height()*2}).setTween(tween).addTo(controller);

		tween = new TweenMax.to("#photo15", 1, {top: "-50%", display: 'block', ease: Linear.easeNone});
		scene = new ScrollScene({triggerElement: "#title15", duration: $(window).height()*2}).setTween(tween).addTo(controller);

		tween = new TweenMax.to("#photo16", 1, {top: "-50%", display: 'block', ease: Linear.easeNone});
		scene = new ScrollScene({triggerElement: "#title16", duration: $(window).height()*2}).setTween(tween).addTo(controller);

		tween = new TweenMax.to("#photo17", 1, {top: "-50%", display: 'block', ease: Linear.easeNone});
		scene = new ScrollScene({triggerElement: "#title17", duration: $(window).height()*2}).setTween(tween).addTo(controller);

		tween = new TweenMax.to("#photo18", 1, {top: "-50%", display: 'block', ease: Linear.easeNone});
		scene = new ScrollScene({triggerElement: "#title18", duration: $(window).height()*2}).setTween(tween).addTo(controller);
		
		// show indicators (requires debug extension)
		//scene.addIndicators();
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
		},
		getMediaWidth: function () {
			var self = this,
				width;
			// Check on this with gavin
			/*
            if (typeof matchMedia !== 'undefined') {
                width = self.bruteForceMediaWidth();
            } else {
            */
			width = window.innerWidth || document.documentElement.clientWidth;
			//}
			return width;
		},
		bruteForceMediaWidth: function () {
			var i = 0,
				found = false;
			while (!found) {
				if (matchMedia('(width: ' + i + 'px)').matches) {
					found = true;
				} else {
					i++;
				}
				// Prevent infinite loop if something goes horribly wrong
				if (i === 9999) {
					break;
				}
			}
			return i;
		}
	}
};
