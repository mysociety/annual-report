$(function(){
  $('body').addClass('has-js');
  $('.nav-toggle').on('click', function(){
    $('nav').toggle();
    $(this).toggleClass('nav-opened');
  });

  // TODO: We should change this when the window size changes
  $('.section').height($(window).height());
});
