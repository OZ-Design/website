$(function() {
  // Initialize delayed youtube player
  YoutubeDelayed.init();

  //#region Main Slider Setup
  $('#slider').glide({
    type: 'carousel',
    mode: 'vertical',
    autoplay: 3000,
    keyboard: false,
    animationDuration: 500,
    animationTimingFunc: 'cubic-bezier(.75,.15,.35,.8)',
    beforeTransition: function(event) {
      // Determine swipe direction
      if (event.swipe.distance > 0) {
        document.getElementById('slider_progress').className =
          'slider_progress slider_progress--animate-reverse';
      } else {
        document.getElementById('slider_progress').className =
          'slider_progress slider_progress--animate';
      }
    },
    afterTransition: function(event) {
      document.getElementById('slider_index').innerHTML =
        '<div class="slider_index-current">' +
        event.index +
        '</div>' +
        '<div class="slider_index-all">/' +
        event.length +
        '</div>';
      document.getElementById('slider_progress').className = 'slider_progress';
    },
    classes: {
      base: 'slider',
      wrapper: 'slider_wrapper',
      track: 'slider_track',
      slide: 'slider_item',
      arrows: 'slider_arrows',
      arrow: 'slider_arrow',
      arrowNext: 'next',
      arrowPrev: 'prev',
      bullets: 'slider_bullets',
      bullet: 'slider_bullet',
      clone: 'clone',
      active: 'active',
      dragging: 'dragging',
      disabled: 'disabled',
    },
  });
  //#endregion

  //#region Main Slider Setup
  $('#preview').glide({
    autoplay: 2000,
    animationDuration: 500,
    keyboard: false,
    animationTimingFunc: 'cubic-bezier(.75,.15,.35,.8)',
    classes: {
      base: 'slider',
      wrapper: 'slider_wrapper',
      track: 'slider_track',
      slide: 'slider_item',
      arrows: 'slider_arrows',
      arrow: 'slider_arrow',
      arrowNext: 'next',
      arrowPrev: 'prev',
      bullets: 'slider_bullets',
      bullet: 'slider_bullet',
      clone: 'clone',
      active: 'active',
      dragging: 'dragging',
      disabled: 'disabled',
    },
  });
  //#endregion

  //#region Background Slider Setup
  $('#slider-hero').glide({
    type: 'slideshow',
    autoplay: 3000,
    animationDuration: 500,
    keyboard: false,
    hoverpause: false,
    animationTimingFunc: 'cubic-bezier(.75,.15,.35,.8)',
    classes: {
      base: 'slider',
      wrapper: 'slider_wrapper',
      track: 'slider_track',
      slide: 'slider_item',
      arrows: 'slider_arrows',
      arrow: 'slider_arrow',
      arrowNext: 'next',
      arrowPrev: 'prev',
      bullets: 'slider_bullets',
      bullet: 'slider_bullet',
      clone: 'clone',
      active: 'active',
      dragging: 'dragging',
      disabled: 'disabled',
    },
  });
  //#endregion

  //#region Smooth scrolling for hash links | https://css-tricks.com/snippets/jquery/smooth-scrolling/
  $('a[href*="#"]')
    // Remove links that don't actually link to anything
    .not('[href="#"]')
    .not('[href="#0"]')
    .click(function(event) {
      // On-page links
      if (
        location.pathname.replace(/^\//, '') ==
          this.pathname.replace(/^\//, '') &&
        location.hostname == this.hostname
      ) {
        // Figure out element to scroll to
        var target = $(this.hash);
        target = target.length
          ? target
          : $('[name=' + this.hash.slice(1) + ']');
        // Does a scroll target exist?
        if (target.length) {
          // Only prevent default if animation is actually gonna happen
          event.preventDefault();
          $('html, body').animate(
            {
              scrollTop: target.offset().top,
            },
            300,
            function() {
              // Callback after animation
              // Must change focus!
              var $target = $(target);
              $target.focus();
              if ($target.is(':focus')) {
                // Checking if the target was focused
                return false;
              } else {
                $target.attr('tabindex', '-1'); // Adding tabindex for elements not focusable
                $target.focus(); // Set focus again
              }
            }
          );
        }
      }
    });
    //#endregion

  //#region Form send and messages Start
  var formMessage = function(message, type) {
    var $container = $('.form-messages'),
      content = '';

    if (!message) {
      console.error('You forgot a message');
      message = 'Add a message';
    }
    if (type == 'success') {
      content +=
        '<div class="form_message form_message-success">' + message + '</div>';
    } else if (type == 'error') {
      content +=
        '<div class="form_message form_message-error">' + message + '</div>';
    } else {
      content +=
        '<div class="form_message form_message-default">' + message + '</div>';
    }

    $container.empty().append(content);
    setTimeout(function() {
      $container.find('.form_message').addClass('showing');
    }, 100);
  };

  var formHide = function() {
    $('.contacts-form_inner')
      .removeClass('hiding')
      .addClass('hidden');
  };

  $('#contact-form').submit(function(e) {
    e.preventDefault();

    var $form = $(this);
    $.post($form.attr('action'), $form.serialize())
      .then(function() {
        formHide();
        setTimeout(
          formMessage(
            'We will contact you within the next few hours. Have a great day and talk soon!',
            'success'
          ),
          200
        );
      })
      .fail(function() {
        setTimeout(
          formMessage('There was an error, try to repeat later.', 'error'),
          400
        );
      });
  });
  //#endregion

});
