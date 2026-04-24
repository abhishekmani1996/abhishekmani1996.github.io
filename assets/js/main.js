/**
*/
!(function($) {
  "use strict";

  // Hero typed
  if ($('.typed').length) {
    var typed_strings = $(".typed").data('typed-items');
    typed_strings = typed_strings.split(',')
    new Typed('.typed', {
      strings: typed_strings,
      loop: true,
      typeSpeed: 100,
      backSpeed: 50,
      backDelay: 2000
    });
  }

  // Smooth scroll for the navigation menu and links with .scrollto classes
  $(document).on('click', '.nav-menu a, .scrollto', function(e) {
    if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
      e.preventDefault();
      var target = $(this.hash);
      if (target.length) {

        var scrollto = target.offset().top;

        $('html, body').animate({
          scrollTop: scrollto
        }, 1500, 'easeInOutExpo');

        if ($(this).parents('.nav-menu, .mobile-nav').length) {
          $('.nav-menu .active, .mobile-nav .active').removeClass('active');
          $(this).closest('li').addClass('active');
        }

        if ($('body').hasClass('mobile-nav-active')) {
          $('body').removeClass('mobile-nav-active');
          $('.mobile-nav-toggle i').toggleClass('icofont-navigation-menu icofont-close');
        }
        return false;
      }
    }
  });

  $('.calendly-link').on('click', function(e) {
    if (window.Calendly && typeof window.Calendly.initPopupWidget === 'function') {
      e.preventDefault();
      window.Calendly.initPopupWidget({
        url: 'https://calendly.com/abhishekmani'
      });
    }
  });

  $(document).on('click', '.mobile-nav-toggle', function(e) {
    $('body').toggleClass('mobile-nav-active');
    $('.mobile-nav-toggle i').toggleClass('icofont-navigation-menu icofont-close');
  });

  $(document).click(function(e) {
    var container = $(".mobile-nav-toggle");
    if (!container.is(e.target) && container.has(e.target).length === 0) {
      if ($('body').hasClass('mobile-nav-active')) {
        $('body').removeClass('mobile-nav-active');
        $('.mobile-nav-toggle i').toggleClass('icofont-navigation-menu icofont-close');
      }
    }
  });

  // Navigation active state on scroll (only on pages that have hash-targeted sections in nav)
  var nav_sections = $('section');
  var main_nav = $('.nav-menu, #mobile-nav');
  var hasHashNav = main_nav.find('a[href^="#"]').length > 0;

  if (hasHashNav) {
    $(window).on('scroll', function() {
      var scrollTop = $(this).scrollTop();
      var windowHeight = $(this).height();
      var docHeight = $(document).height();
      var cur_pos = scrollTop + windowHeight / 2;
      var matched = false;

      // If at bottom of page, activate last matching section
      if (scrollTop + windowHeight >= docHeight - 5) {
        var lastId = nav_sections.last().attr('id');
        var lastMatch = main_nav.find('a[href="#' + lastId + '"]').parent('li');
        if (lastMatch.length) {
          main_nav.find('li').removeClass('active');
          lastMatch.addClass('active');
          return;
        }
      }

      nav_sections.each(function() {
        var id = $(this).attr('id');
        var match = main_nav.find('a[href="#' + id + '"]').parent('li');
        if (!match.length) return;

        var top = $(this).offset().top,
          bottom = top + $(this).outerHeight();

        if (cur_pos >= top && cur_pos <= bottom) {
          main_nav.find('li').removeClass('active');
          match.addClass('active');
          matched = true;
        }
      });

      if (scrollTop < 200 && main_nav.find('a[href="#hero"]').length) {
        main_nav.find('li').removeClass('active');
        main_nav.find('a[href="#hero"]').parent('li').addClass('active');
      }
    });
  }

  // Back to top button
  $(window).scroll(function() {
    if ($(this).scrollTop() > 100) {
      $('.back-to-top').fadeIn('slow');
    } else {
      $('.back-to-top').fadeOut('slow');
    }
  });

  $('.back-to-top').click(function() {
    $('html, body').animate({
      scrollTop: 0
    }, 1500, 'easeInOutExpo');
    return false;
  });

  // jQuery counterUp
  if ($.fn.counterUp && $('[data-toggle="counter-up"]').length) {
    $('[data-toggle="counter-up"]').counterUp({
      delay: 10,
      time: 1000
    });
  }

  // Resume accordion timeline
  $('.resume-accordion-trigger').on('click', function() {
    var item = $(this).closest('.resume-experience-item');
    var isOpen = item.hasClass('is-open');

    item.toggleClass('is-open', !isOpen);
    $(this).attr('aria-expanded', String(!isOpen));
  });

  // Project case study modals
  var lastProjectTrigger = null;

  $('[data-project-modal]').on('click', function() {
    var modalId = $(this).data('project-modal') + '-modal';
    var modal = $('#' + modalId);

    if (!modal.length) return;

    lastProjectTrigger = this;
    modal.removeAttr('hidden');
    $('body').addClass('project-modal-open');
    modal.find('.project-modal-close').focus();
  });

  $('[data-project-modal-close]').on('click', function() {
    var modal = $(this).closest('.project-modal');

    modal.attr('hidden', true);
    $('body').removeClass('project-modal-open');

    if (lastProjectTrigger) {
      lastProjectTrigger.focus();
    }
  });

  $(document).on('keydown', function(e) {
    if (e.key !== 'Escape') return;

    var modal = $('.project-modal:not([hidden])');

    if (!modal.length) return;

    modal.attr('hidden', true);
    $('body').removeClass('project-modal-open');

    if (lastProjectTrigger) {
      lastProjectTrigger.focus();
    }
  });

  // Initi AOS
  AOS.init({
    duration: 1000,
    easing: "ease-in-out-back"
  });

})(jQuery);
