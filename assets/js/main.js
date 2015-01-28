$(function(){
  $('body').addClass('has-js');
  $('.nav-toggle').on('click', function(){
    $('nav').toggle();
    $(this).toggleClass('nav-opened');
  });
});
