(function($) {
  "use strict"; // Start of use strict

  // Smooth scrolling using jQuery easing
  $('a.js-scroll-trigger[href*="#"]:not([href="#"])').click(function() {
    if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
      if (target.length) {
        $('html, body').animate({
          scrollTop: (target.offset().top - 54)
        }, 1000, "easeInOutExpo");
        return false;
      }
    }
  });

  // Closes responsive menu when a scroll trigger link is clicked
  $('.js-scroll-trigger').click(function() {
    $('.navbar-collapse').collapse('hide');
  });

  // Activate scrollspy to add active class to navbar items on scroll
  $('body').scrollspy({
    target: '#mainNav',
    offset: 56
  });

  // Collapse Navbar
  var navbarCollapse = function() {
    if ($("#mainNav").offset().top > 100) {
      $("#mainNav").addClass("navbar-shrink");
    } else {
      $("#mainNav").removeClass("navbar-shrink");
    }
  };
  // Collapse now if page is not at top
  navbarCollapse();
  // Collapse the navbar when page is scrolled
  $(window).scroll(navbarCollapse);

  //filling in texts
  $.getJSON("texts.json", function(texts) {
    $('#contact-paragraph').html(texts.contact_us);
    $('#about-paragraph').html(texts.about_us);
    $('#team-members-paragraph').html(texts.team_members);

    var $teamMemberContainer = $('.team-member-container');
    texts.member_bios.forEach(function(bio){
      var $bioContainer = $('<div>').addClass('col-6 col-md-4 team-member');
      var $elements = [
        $('<img>').addClass('mx-auto rounded-circle').attr({ src: 'img/team/' + bio.name.toLowerCase() + '.jpg' }),
        $('<h4>').html(bio.name + ' ' + bio.pronoun),
        $('<p>').html(bio['sftx-teams']).addClass('text-muted'),
        $('<p>').html('Working on: ').addClass('bio-title'),
        $('<p>').html(bio['tango-challenges']),
        $('<p>').html('Secret Obsessions: ').addClass('bio-title'),
        $('<p>').html(bio.obsessions)
      ];
      $elements.forEach(function($element){ $bioContainer.append($element); })
      $teamMemberContainer.append($bioContainer);
    });

    var $expectListContainer = $('#expect-list');
    $expectListContainer.append($('<p>').html('What to Expect:'))
    texts.what_to_expect.forEach(function(item){
      var $element = $('<li>').html(item);
      $expectListContainer.append($element);
    })
  });

})(jQuery); // End of use strict
