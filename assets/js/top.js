// JavaScript Document

$(function () {

  //ページ内リンク スクロール
  var headerHight = 30;
  $('.header__navigation a').click(function () {
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
