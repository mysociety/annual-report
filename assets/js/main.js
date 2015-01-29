$(function(){
  $('body').addClass('has-js');
  $('.nav-toggle').on('click', function(){
    $('nav').toggle();
    $(this).toggleClass('nav-opened');
  });

  var canvasBasicsEmployees = $('.chart__basics-employees canvas').get(0).getContext('2d');
  var chartBasicsEmployees = new Chart(canvasBasicsEmployees).Line({
    labels: ['', '', '', '', ''],
    datasets: [{
      fillColor: 'rgba(182, 42, 41, 0.5)', // dark red
      strokeColor: 'rgba(255, 255, 255, 0.5)',
      pointColor: '#fff',
      pointStrokeColor: $('body').css('background-color'), // red
      data: [8-6, 12-6, 16-6, 21-6, 27-6]
    }]
  }, {
    animation: false,
    bezierCurve: false,
    scaleShowGridLines: false,
    showScale: false,
    responsive: true,
    maintainAspectRatio: false,
    showTooltips: false
  });

  new Chart( $('#chart__partisan__pets').get(0).getContext('2d') ).Pie([
    {
      value: 13,
      label: 'Kittens',
      color: 'rgba(255, 255, 255, 0.4)'
    }, {
      value: 6,
      label: 'Puppies',
      color: 'rgba(255, 255, 255, 0.6)'
    }
  ], {
    responsive: true,
    segmentStrokeColor: $('body').css('background-color'),
    animationEasing: "easeOutQuart"
  });

  new Chart( $('#chart__partisan__drinks').get(0).getContext('2d') ).Pie([
    {
      value: 10,
      label: 'Tea',
      color: 'rgba(255, 255, 255, 0.4)'
    }, {
      value: 9,
      label: 'Coffee',
      color: 'rgba(255, 255, 255, 0.6)'
    }
  ], {
    responsive: true,
    segmentStrokeColor: $('body').css('background-color'),
    animationEasing: "easeOutQuart"
  });

  new Chart( $('#chart__partisan__activities').get(0).getContext('2d') ).Pie([
    {
      value: 11,
      label: 'Karaoke',
      color: 'rgba(255, 255, 255, 0.4)'
    }, {
      value: 8,
      label: 'Climbing',
      color: 'rgba(255, 255, 255, 0.6)'
    }
  ], {
    responsive: true,
    segmentStrokeColor: $('body').css('background-color'),
    animationEasing: "easeOutQuart"
  });

});
