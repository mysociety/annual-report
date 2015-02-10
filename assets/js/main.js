$.fn.isVisible = function(options){
  // Returns true if element is even partially visible in the viewport
  // (or only if fully visible, if the option is supplied)
  var settings = $.extend({
    fullyVisible: false
  }, options);
  var wTop = $(window).scrollTop();
  var wBottom = wTop + $(window).height();
  var eTop = this.offset().top;
  var eBottom = eTop + this.height();

  if(settings.fullyVisible === true){
    return (eTop >= wTop) && (eBottom <= wBottom);
  } else {
    return ((eTop < wBottom) && (eBottom > wTop)) || ((eBottom > wTop) && (eTop < wBottom));
  }
}

var makeSparkline = function makeSparkline(){
  // expects $(this) to be a table with a single row of cells
  var $table = $(this);
  var $canvas = $('<canvas>').insertBefore($table);
  var data = [];
  var labels = [];
  var strokeColour = $(this).attr('data-stroke') || 'rgba(255, 255, 255, 0.5)';
  var fillColour = $(this).attr('data-fill') || 'rgba(255, 255, 255, 0.1)';
  var pointColour = $(this).attr('data-points') || '#fff';
  var pointStrokeColour = $('body').css('background-color');
  var settings = {
    animation: false,
    bezierCurve: false,
    scaleShowGridLines: false,
    showScale: false,
    responsive: true,
    maintainAspectRatio: false,
    showTooltips: false
  };

  $('td', $table).each(function(i){
    data.push(parseFloat($(this).text()));
    labels.push('');
  });

  if($(this).attr('data-start')){
    settings.scaleOverride = true;
    settings.scaleStartValue = parseFloat($(this).attr('data-start'));
    if($(this).attr('data-end')){
      settings.scaleSteps = parseFloat($(this).attr('data-end')) - settings.scaleStartValue;
    } else {
      settings.scaleSteps = data[data.length - 1] - settings.scaleStartValue;
    }
    settings.scaleStepWidth = 1;
  }

  new Chart($canvas.get(0).getContext('2d')).Line({
    labels: labels,
    datasets: [{
      fillColor: fillColour,
      strokeColor: strokeColour,
      pointColor: pointColour,
      pointStrokeColor: pointStrokeColour,
      data: data
    }]
  }, settings);

  $table.hide();
}

var makePieChart = function makePieChart(){
  // expects $(this) to be a table with one row of two cells (label, value) per pie segment
  var $table = $(this);
  var $rows = $('tr', $table);
  var $canvas = $('<canvas>').attr({
    width: 100,
    height: 100
  }).insertBefore($table);

  var animationDelay = -1;
  if((typeof $table.attr('data-delay') != 'undefined') && parseInt($table.attr('data-delay')) > -1){
    animationDelay = parseInt($table.attr('data-delay'));
  }

  var data = [];
  var opacities = [0.4, 0.6, 0.8, 0.4, 0.6, 0.8];
  var settings = {
    responsive: true,
    segmentStrokeColor: $('body').css('background-color'),
    animationEasing: 'easeOutQuart',
    tooltipFontSize: 18,
    tooltipXPadding: 9,
    tooltipYPadding: 9,
    tooltipTemplate: '<%=label%>'
  };

  $rows.each(function(i){
    data.push({
      value: parseFloat($('td', this).text()),
      label: $('th', this).text(),
      color: 'rgba(255, 255, 255, ' + opacities[i] + ')',
      highlight: 'rgba(255, 255, 255, 0.9)',
    })
  });

  var chart = new Chart($canvas.get(0).getContext('2d')).Pie(data, settings);
  $table.hide();

  if(animationDelay > -1) {
    var chartHasRendered = false;
    $canvas.css('visibility', 'hidden');

    $(window).scroll(function(){
      if($canvas.isVisible() && chartHasRendered == false){
        chartHasRendered = true;
        setTimeout(function(){
          $canvas.css('visibility', '');
          chart.render()
        }, animationDelay);
      }
    });
  }
}

var setUpParallaxBackground = function setUpParallaxBackground(){
  var $el = $(this);
  var backgroundXY = $el.css('background-position').split(' '); // eg: ['50%', '40%']
  var backgroundY = parseFloat(backgroundXY[1]) / 100; // convert % into decimal fraction
  var elHeight = $el.height();
  var elTop = $el.offset().top;
  var elMiddle = elTop + (elHeight / 2);
  var elBottom = elTop + elHeight;

  var repositionBackground = function(){
    var wHeight = $(window).height();
    var wTop = $(window).scrollTop();
    var wMiddle = wTop + (wHeight / 2);
    var wBottom = wTop + wHeight;

    // some pixel value (negative above the middle of the window, positive below)
    var elMiddleOffset = elMiddle - wMiddle;

    // fraction representing how negative or positive that midpoint is, compared to window bounds
    var elMiddleOffsetFraction = elMiddleOffset / wHeight;

    // adjust default position by adding/subtracting a bit of the midpoint offset
    var newBackgroundY = backgroundY + (elMiddleOffsetFraction / 3);

    // Make sure background position is between 0 and 100
    var newBackgroundYBounded = Math.max(Math.min(newBackgroundY * 100, 100), 0);

    $el.css('background-position', backgroundXY[0] + ' ' + newBackgroundYBounded + '%');
  }

  $(window).scroll(repositionBackground);
  $(window).on('resize', repositionBackground);
  repositionBackground();
}

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

var keenClient = new Keen({
  projectId: "54d0ed6446f9a766f4d11a2e",
  writeKey: "f2b17227b09a4b72d0edd97a9d7c9ea7c8b281bf99bcc444b3d6d1384e52224e8ff88ccc03e684ff1d17009cceb1a1ed5104d3441cdde1a1fca060bad0f1476fc885e5230d45a80d0c3aa4bd8600f6abeff1a30571ad18ee52b0fa77760e172ceffbbd941a603b299f5c8a7c112a49da"
});

$(function(){
  $('body').addClass('has-js');
  $('.nav-toggle').on('click', function(){
    $('nav').toggle();
    $(this).toggleClass('nav-opened');
  });

  $('.js-make-sparkline').each(makeSparkline);
  $('.js-make-pie-chart').each(makePieChart);

  $('.js-parallax-background').each(setUpParallaxBackground);

  // Wait until we’re sure images have finished loading
  $(window).load(function(){
    $('.js-slideshow').each(setUpSlideshow);
  })

  var screenTimeFields = [];

  $('[data-st-id]').each(function(i){
    screenTimeFields.push({
      'selector': '[data-st-id="' + $(this).data('st-id') + '"]',
      'name': $(this).data('st-id')
    });
  });

  $.screentime({
    fields: screenTimeFields,
    callback: function(data) {
      keenClient.addEvent("Screentime", data);
    }
  });

  riveted.init();
});
