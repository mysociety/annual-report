var setUpSlideshow = function setUpSlideShow(){
  // expects $(this) to be a .slideshow div
  var $outer = $(this);
  var $inner = $('.slideshow__inner', $outer);
  var $slides = $('.slideshow__slide', $outer);

  var totalSlidesWidth = 0;
  $slides.each(function(){
    totalSlidesWidth += $(this).outerWidth(true);
  });
  var keyframeName = 'slide-' + totalSlidesWidth;

  // duplicate all the slides, so we can loop the slideshow infinitely
  $slides.clone().addClass('slideshow__slide--clone').appendTo($inner);

  $.keyframe.define([{
    name: keyframeName,
    '0%': {'transform': 'translate(0px)'},
    '100%': {'transform': 'translate(' + (totalSlidesWidth * -1) + 'px)'}
  }]);

  $inner.playKeyframe({
    name: keyframeName,
    duration: '' + (totalSlidesWidth / 30) + 's',
    timingFunction: 'linear',
    iterationCount: 'infinite'
  });
}

$(function(){

  $('body').addClass('has-js');

  $('.nav-toggle').on('click', function(){
    $('nav').toggleClass('nav-opened');
    $(this).toggleClass('nav-opened');
  });

  // Wait until we’re sure images have finished loading
  $(window).load(function(){
    $('.js-slideshow').each(setUpSlideshow);
  })

});
