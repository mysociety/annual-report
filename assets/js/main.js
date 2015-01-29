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

$(function(){
  $('body').addClass('has-js');
  $('.nav-toggle').on('click', function(){
    $('nav').toggle();
    $(this).toggleClass('nav-opened');
  });

  $('.js-make-sparkline').each(function(){
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
  });

  $('.js-make-pie-chart').each(function(){
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
    var opacities = ['0.4', '0.6', '0.8', '0.4', '0.6', '0.8'];
    var settings = {
      responsive: true,
      segmentStrokeColor: $('body').css('background-color'),
      animationEasing: 'easeOutQuart',
      showTooltips: false
    };

    $rows.each(function(i){
      data.push({
        value: parseFloat($('td', this).text()),
        label: $('th', this).text(),
        color: 'rgba(255, 255, 255, ' + opacities[i] + ')'
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

  });

});
