// JavaScript Document
//トップページスライダー
$(document).ready(function () {
  $('.section-top__slick').slick({
    fade: true,
    autoplay: true,
    autoplayspeed: 6000,
    speed: 2000,
    arrows: false,
    swipe: false,
    accessibility: false,
    pauseOnHover: false,
    adaptiveHeight: true,
    dots: true
  });
});
