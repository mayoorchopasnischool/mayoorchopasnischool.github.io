/*
	Landed by HTML5 UP
	html5up.net | @ajlkn
	Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
*/

(function($) {

	skel.breakpoints({
		xlarge: '(max-width: 1680px)',
		large: '(max-width: 1280px)',
		medium: '(max-width: 980px)',
		small: '(max-width: 736px)',
		xsmall: '(max-width: 480px)'
	});

	$(function() {

		var	$window = $(window),
			$body = $('body');

		// Disable animations/transitions until the page has loaded.
			$body.addClass('is-loading');

			$window.on('load', function() {
				window.setTimeout(function() {
					$body.removeClass('is-loading');
				}, 0);
			});

		// Touch mode.
			if (skel.vars.mobile)
				$body.addClass('is-touch');

		// Fix: Placeholder polyfill.
			$('form').placeholder();

		// Prioritize "important" elements on medium.
			skel.on('+medium -medium', function() {
				$.prioritize(
					'.important\\28 medium\\29',
					skel.breakpoint('medium').active
				);
			});

		// Scrolly links.
			$('.scrolly').scrolly({
				speed: 2000
			});

		// Dropdowns.
			$('#nav > ul').dropotron({
				alignment: 'right',
				hideDelay: 350
			});

		// Off-Canvas Navigation.

			// Title Bar.
				$(
					'<div id="titleBar">' +
						'<a href="#navPanel" class="toggle"></a>' +
						'<span class="title">' + $('#logo').html() + '</span>' +
					'</div>'
				)
					.appendTo($body);

			// Navigation Panel.
				$(
					'<div id="navPanel">' +
						'<nav>' +
							$('#nav').navList() +
						'</nav>' +
					'</div>'
				)
					.appendTo($body)
					.panel({
						delay: 500,
						hideOnClick: true,
						hideOnSwipe: true,
						resetScroll: true,
						resetForms: true,
						side: 'left',
						target: $body,
						visibleClass: 'navPanel-visible'
					});

			// Fix: Remove navPanel transitions on WP<10 (poor/buggy performance).
				if (skel.vars.os == 'wp' && skel.vars.osVersion < 10)
					$('#titleBar, #navPanel, #page-wrapper')
						.css('transition', 'none');

		// Parallax.
		// Disabled on IE (choppy scrolling) and mobile platforms (poor performance).
			if (skel.vars.browser == 'ie'
			||	skel.vars.mobile) {

				$.fn._parallax = function() {

					return $(this);

				};

			}
			else {

				$.fn._parallax = function() {

					$(this).each(function() {

						var $this = $(this),
							on, off;

						on = function() {

							$this
								.css('background-position', 'center 0px');

							$window
								.on('scroll._parallax', function() {

									var pos = parseInt($window.scrollTop()) - parseInt($this.position().top);

									$this.css('background-position', 'center ' + (pos * -0.15) + 'px');

								});

						};

						off = function() {

							$this
								.css('background-position', '');

							$window
								.off('scroll._parallax');

						};

						skel.on('change', function() {

							if (skel.breakpoint('medium').active)
								(off)();
							else
								(on)();

						});

					});

					return $(this);

				};

				$window
					.on('load resize', function() {
						$window.trigger('scroll');
					});

			}

		// Spotlights.
			var $spotlights = $('.spotlight');

			$spotlights
				._parallax()
				.each(function() {

					var $this = $(this),
						on, off;

					on = function() {

						// Use main <img>'s src as this spotlight's background.
							$this.css('background-image', 'url("' + $this.find('.image.main > img').attr('src') + '")');

						// Enable transitions (if supported).
							if (skel.canUse('transition')) {

								var top, bottom, mode;

								// Side-specific scrollex tweaks.
									if ($this.hasClass('top')) {

										mode = 'top';
										top = '-20%';
										bottom = 0;

									}
									else if ($this.hasClass('bottom')) {

										mode = 'bottom-only';
										top = 0;
										bottom = '20%';

									}
									else {

										mode = 'middle';
										top = 0;
										bottom = 0;

									}

								// Add scrollex.
									$this.scrollex({
										mode:		mode,
										top:		top,
										bottom:		bottom,
										initialize:	function(t) { $this.addClass('inactive'); },
										terminate:	function(t) { $this.removeClass('inactive'); },
										enter:		function(t) { $this.removeClass('inactive'); },

										// Uncomment the line below to "rewind" when this spotlight scrolls out of view.

										//leave:	function(t) { $this.addClass('inactive'); },

									});

							}

					};

					off = function() {

						// Clear spotlight's background.
							$this.css('background-image', '');

						// Disable transitions (if supported).
							if (skel.canUse('transition')) {

								// Remove scrollex.
									$this.unscrollex();

							}

					};

					skel.on('change', function() {

						if (skel.breakpoint('medium').active)
							(off)();
						else
							(on)();

					});

				});

		// Wrappers.
			var $wrappers = $('.wrapper');

			$wrappers
				.each(function() {

					var $this = $(this),
						on, off;

					on = function() {

						if (skel.canUse('transition')) {

							$this.scrollex({
								top:		250,
								bottom:		0,
								initialize:	function(t) { $this.addClass('inactive'); },
								terminate:	function(t) { $this.removeClass('inactive'); },
								enter:		function(t) { $this.removeClass('inactive'); },

								// Uncomment the line below to "rewind" when this wrapper scrolls out of view.

								//leave:	function(t) { $this.addClass('inactive'); },

							});

						}

					};

					off = function() {

						if (skel.canUse('transition'))
							$this.unscrollex();

					};

					skel.on('change', function() {

						if (skel.breakpoint('medium').active)
							(off)();
						else
							(on)();

					});

				});

		// Banner.
			var $banner = $('#banner');

			$banner
				._parallax();

	});

	var Modal = (function() {

		var trigger = $qsa('.modal__trigger'); // what you click to activate the modal
		var modals = $qsa('.modal'); // the entire modal (takes up entire window)
		var modalsbg = $qsa('.modal__bg'); // the entire modal (takes up entire window)
		var content = $qsa('.modal__content'); // the inner content of the modal
		  var closers = $qsa('.modal__close'); // an element used to close the modal
		var w = window;
		var isOpen = false;
		  var contentDelay = 400; // duration after you click the button and wait for the content to show
		var len = trigger.length;
	  
		// make it easier for yourself by not having to type as much to select an element
		function $qsa(el) {
		  return document.querySelectorAll(el);
		}
	  
		var getId = function(event) {
	  
		  event.preventDefault();
		  var self = this;
		  // get the value of the data-modal attribute from the button
		  var modalId = self.dataset.modal;
		  var len = modalId.length;
		  // remove the '#' from the string
		  var modalIdTrimmed = modalId.substring(1, len);
		  // select the modal we want to activate
		  var modal = document.getElementById(modalIdTrimmed);
		  // execute function that creates the temporary expanding div
		  makeDiv(self, modal);
		};
	  
		var makeDiv = function(self, modal) {
	  
		  var fakediv = document.getElementById('modal__temp');
	  
		  /**
		   * if there isn't a 'fakediv', create one and append it to the button that was
		   * clicked. after that execute the function 'moveTrig' which handles the animations.
		   */
	  
		  if (fakediv === null) {
			var div = document.createElement('div');
			div.id = 'modal__temp';
			self.appendChild(div);
			moveTrig(self, modal, div);
		  }
		};
	  
		var moveTrig = function(trig, modal, div) {
		  var trigProps = trig.getBoundingClientRect();
		  var m = modal;
		  var mProps = m.querySelector('.modal__content').getBoundingClientRect();
		  var transX, transY, scaleX, scaleY;
		  var xc = w.innerWidth / 2;
		  var yc = w.innerHeight / 2;
	  
		  // this class increases z-index value so the button goes overtop the other buttons
		  trig.classList.add('modal__trigger--active');
	  
		  // these values are used for scale the temporary div to the same size as the modal
		  scaleX = mProps.width / trigProps.width;
		  scaleY = mProps.height / trigProps.height;
	  
		  scaleX = scaleX.toFixed(3); // round to 3 decimal places
		  scaleY = scaleY.toFixed(3);
	  
	  
		  // these values are used to move the button to the center of the window
		  transX = Math.round(xc - trigProps.left - trigProps.width / 2);
		  transY = Math.round(yc - trigProps.top - trigProps.height / 2);
	  
			  // if the modal is aligned to the top then move the button to the center-y of the modal instead of the window
		  if (m.classList.contains('modal--align-top')) {
			transY = Math.round(mProps.height / 2 + mProps.top - trigProps.top - trigProps.height / 2);
		  }
	  
	  
			  // translate button to center of screen
			  trig.style.transform = 'translate(' + transX + 'px, ' + transY + 'px)';
			  trig.style.webkitTransform = 'translate(' + transX + 'px, ' + transY + 'px)';
			  // expand temporary div to the same size as the modal
			  div.style.transform = 'scale(' + scaleX + ',' + scaleY + ')';
			  div.style.webkitTransform = 'scale(' + scaleX + ',' + scaleY + ')';
	  
	  
			  window.setTimeout(function() {
				  window.requestAnimationFrame(function() {
					  open(m, div);
				  });
			  }, contentDelay);
	  
		};
	  
		var open = function(m, div) {
	  
		  if (!isOpen) {
			// select the content inside the modal
			var content = m.querySelector('.modal__content');
			// reveal the modal
			m.classList.add('modal--active');
			// reveal the modal content
			content.classList.add('modal__content--active');
	  
			/**
			 * when the modal content is finished transitioning, fadeout the temporary
			 * expanding div so when the window resizes it isn't visible ( it doesn't
			 * move with the window).
			 */
	  
			content.addEventListener('transitionend', hideDiv, false);
	  
			isOpen = true;
		  }
	  
		  function hideDiv() {
			// fadeout div so that it can't be seen when the window is resized
			div.style.opacity = '0';
			content.removeEventListener('transitionend', hideDiv, false);
		  }
		};
	  
		var close = function(event) {
	  
			  event.preventDefault();
		  event.stopImmediatePropagation();
	  
		  var target = event.target;
		  var div = document.getElementById('modal__temp');
	  
		  /**
		   * make sure the modal__bg or modal__close was clicked, we don't want to be able to click
		   * inside the modal and have it close.
		   */
	  
		  if (isOpen && target.classList.contains('modal__bg') || target.classList.contains('modal__close')) {
	  
			// make the hidden div visible again and remove the transforms so it scales back to its original size
			div.style.opacity = '1';
			div.removeAttribute('style');
	  
				  /**
				  * iterate through the modals and modal contents and triggers to remove their active classes.
			* remove the inline css from the trigger to move it back into its original position.
				  */
	  
				  for (var i = 0; i < len; i++) {
					  modals[i].classList.remove('modal--active');
					  content[i].classList.remove('modal__content--active');
					  trigger[i].style.transform = 'none';
			  trigger[i].style.webkitTransform = 'none';
					  trigger[i].classList.remove('modal__trigger--active');
				  }
	  
			// when the temporary div is opacity:1 again, we want to remove it from the dom
				  div.addEventListener('transitionend', removeDiv, false);
	  
			isOpen = false;
	  
		  }
	  
		  function removeDiv() {
			setTimeout(function() {
			  window.requestAnimationFrame(function() {
				// remove the temp div from the dom with a slight delay so the animation looks good
				div.remove();
			  });
			}, contentDelay - 50);
		  }
	  
		};
	  
		var bindActions = function() {
		  for (var i = 0; i < len; i++) {
			trigger[i].addEventListener('click', getId, false);
			closers[i].addEventListener('click', close, false);
			modalsbg[i].addEventListener('click', close, false);
		  }
		};
	  
		var init = function() {
		  bindActions();
		};
	  
		return {
		  init: init
		};
	  
	  }());
	  
	  Modal.init();

})(jQuery);