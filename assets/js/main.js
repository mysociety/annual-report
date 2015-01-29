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
      width: 200,
      height: 200
    }).insertBefore($table);
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

    new Chart($canvas.get(0).getContext('2d')).Pie(data, settings);

    $table.hide();
  });

});
