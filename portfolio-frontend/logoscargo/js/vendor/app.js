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

  //#region Tabs
  jQuery('.tabs_link').click(function(e) {
    var target = jQuery(this).data('tab');
    e.preventDefault();

    jQuery('.tabs_link').removeClass('tabs_link--active');
    jQuery('.tabs_content').removeClass('tabs_content--active');

    jQuery(this).addClass('tabs_link--active');
    jQuery(target).addClass('tabs_content--active');
  });
  //#endregion

  //#region equal heights
  var heightEqual = function(elem) {
    var elements = document.getElementsByClassName(elem);

    var elementHeights = Array.prototype.map.call(elements, el => {
      return el.clientHeight;
    });

    var maxHeight = Math.max(...elementHeights);

    if (window.innerWidth > 748) {
      Array.prototype.forEach.call(
        elements,
        el => (el.style.height = `${maxHeight}px`)
      );
    }
  };

  heightEqual('card_top');
  //#endregion

  //#region tracking
  var tracking = (function(params) {
    var trackingOutput = $('#js-tracking_output');
    $('#js-tracking_submit').click(function(event) {
      event.preventDefault();
      var trackingInput = $('#js-tracking_input')
        .val()
        .toLowerCase();

      if (trackingInput.length === 8) {
        getData(trackingInput);
      } else {
        showError('Wrong tracking number');
      }
    });

    function getData(input) {
      var url = 'tracking.json';

      jQuery
        .ajax({
          url: url,
          dataType: 'json',
          // beforeSend: showLoading(true), complete: showLoading(false),
        })
        .done(function(data) {
          if (jQuery.isEmptyObject(data)) {
            showError('Wrong tracking number');
          } else {
            setData(data);
          }
        })
        .fail(function(xhr, error) {
          showError('Sending form error');
        });
    }

    function showLoading(isLoading) {
      if (isLoading) {
        trackingOutput.html('<div class="tracking_loading"></div>');
      } else {
        trackingOutput.html('');
      }
    }

    function showError(err) {
      let output =
        '<div class="form_message form_message-error showing">' +
        err +
        '</div>';
      trackingOutput.html(output);
    }

    function setData(data) {
      let output = '';
      output =
        '<div class="tracking_title">Tracking Number</div><div class="tracking_value">' +
        data.title +
        '</div>';
      output +=
        '<div class="tracking_title">Delivery date</div><div class="tracking_o-value">' +
        data.date +
        '</div>';
      output +=
        '<div class="tracking_title">Invoice Total</div><div class="tracking_value">' +
        data.total +
        '<span class="currency-sign"> \u20bd</span></div>';
      output +=
        '<div class="tracking_title">Status</div><div class="tracking_value">' +
        data.status +
        '</div>';
      output +=
        '<div class="tracking_title">Notes</div><div class="tracking_value">' +
        data.note +
        '</div>';
      trackingOutput.html(output);
    }
  })();
  //#endregion

  //#region accordeon
  jQuery('.collapse_btn').click(function(e) {
    jQuery(this).toggleClass('collapse_btn--is-open');
    var target = jQuery(this).data('target');
    jQuery(target).toggle();
  });
  //#endregion

  //#region menu open/close
  $('.js-menu-toggle').click(function(e) {
    e.preventDefault();

    var target = $(this).data('target');
    var isVisible = $(target).css('z-index') == '-1';

    if (!isVisible) {
      $(target).removeClass('main-menu--is-active');
    } else {
      $(target).addClass('main-menu--is-active');
    }
  });
  //#endregion
});
