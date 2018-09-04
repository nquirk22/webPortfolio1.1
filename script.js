const SITE = document.querySelector('.site');
const TRIGGER = document.querySelector('.trigger');
const XTRIGGER = document.querySelector('.xtrigger');
const NAVIGATION = document.querySelector('.navigation');
const NAVIGATION_BAR = document.querySelector('.top-bar');
const NAV_MENU = document.querySelector('.navigation-menu');
const OVERLAY = document.querySelector('.overlay');
const HELLO_ELT = document.querySelector("#hello");// for masthead animation
// const FOOTER = document.querySelector('.footer');



// Toggle reveal class on body element,
// set aria-expanded and screen reader text on TRIGGER:
function revealMenu() {
  if ( NAVIGATION.getAttribute('aria-expanded') == 'false') {
    NAVIGATION.setAttribute('aria-expanded', true);
    OVERLAY.classList.add('open');
  } else {
    NAVIGATION.setAttribute('aria-expanded', false);
    OVERLAY.classList.remove('open');
  }
}


// Hide nav area when focus shifts away:
function catchFocus() {
	if ( TRIGGER.getAttribute('aria-expanded') == 'true' &&
      !( NAV_MENU.includes(document.activeElement) ||
          document.activeElement === TRIGGER ) ) {
		revealMenu();
	} else {
		return;
	}
}

// Hide nav area when touch or click happens elsewhere:
function clickTarget(e) {
	if ( NAVIGATION.getAttribute('aria-expanded') ==
      'true' && !NAVIGATION_BAR.contains(e.target) ) {
		revealMenu();
	}
}

// FOOTER ANIMATION--------------------------------------------------
// var _throttleTimer = null;
// var _throttleDelay = 100;
// var $window = $(window);
// var $document = $(document);
//
// $document.ready(function () {
//
//     $window
//         .off('scroll', ScrollHandler)
//         .on('scroll', ScrollHandler);
//
// });
//
//
// function ScrollHandler(e) {
//     //throttle event:
//     clearTimeout(_throttleTimer);
//     _throttleTimer = setTimeout(function () {
//         if ($window.scrollTop() + $window.height() > $document.height()) {
//             FOOTER.style.transform = "translateY(0)";
//         }
//     }, _throttleDelay);
// }

// MASTHEAD ANIMATION----------------------------------------------------
var captions = ['Hi,',
  "I'm Nathan",
  "problem solver",
  "software developer"];

function type(elt, priorLength, str, next) {
  if (elt.innerHTML.length != priorLength + str.length) {
    elt.innerHTML += str.charAt(elt.innerHTML.length - priorLength);
    setTimeout(type, 200, elt, priorLength, str, next);
  } else {
    if (next) {
      next();
    }
  }
}

function erase(elt, toKeep, next) {
  let eltLength = elt.innerHTML.length;
  if ( eltLength > toKeep ) {
    elt.innerHTML = elt.innerHTML.substr(0, eltLength - 1);
    setTimeout(erase, 100, elt, toKeep, next);
  } else {
    if (next) {
      next();
    }
  }
}

$(document).ready(function() {
    var cursorAnimation = function() {
        $('#cursor').animate({
            opacity: 0
        }, 'fast', 'swing').animate({
            opacity: 1
        }, 'fast', 'swing');
    }
    interval = setInterval (cursorAnimation, 850);
    var period = function() {
      clearInterval(interval);
      document.querySelector('#period').style.width = "14px";
      document.querySelector('#period').style.opacity = "1";
      document.querySelector('#cursor').style.visibility = "collapse";

    };
    // var seventh = function() {setTimeout(type, 700, HELLO_ELT, HELLO_ELT.innerHTML.length, captions[3], period);};// prints [2]
    // var sixth = function() {setTimeout(erase, 2000, HELLO_ELT, 6, seventh)};// erases [2]
    // var fifth = function() {setTimeout(type, 700, HELLO_ELT, HELLO_ELT.innerHTML.length, captions[2], sixth);};// prints [2]
    // var fourth = function() {setTimeout(erase, 2000, HELLO_ELT, 6, fifth)};// erases [1]
    var third = function() {setTimeout(type, 800, HELLO_ELT, HELLO_ELT.innerHTML.length, captions[1], period);};// prints [1]
    var second = function() {setTimeout(erase, 2000, HELLO_ELT, 0, third)};// erases [0]

    setTimeout(type, 2250, HELLO_ELT, HELLO_ELT.innerHTML.length, captions[0], second);
});

// EVENT LISTENERS----------------------------------------------------
// Listen for clicks on TRIGGER button:
TRIGGER.addEventListener('click', revealMenu, false);
// XTRIGGER.addEventListener('click', hideMenu, false);

// Listen for focus changes:
SITE.addEventListener('focusin', catchFocus, true);

// Listen for clicks:
SITE.addEventListener('click', function(e) { clickTarget(e); }, true);

// for (let i = 0; i < MENUITEMS.length; i++) {
//   MENUITEMS[i].addEventListener('click', hideMenu, false);
// }
