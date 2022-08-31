// JavaScript Document

$(function () {

  //スマホ版でマップからページ内リンク
  var headerHight = 70;
  $('.section-top__month-menu a').click(function () {
    var speed = 500;
    var href = $(this).attr("href");
    var target = $(href == "#" || href == "" ? 'html' : href);
    var position = target.offset().top - headerHight;
    $('body,html').animate({
      scrollTop: position
    }, speed, 'swing');
    return false;
  });

});
