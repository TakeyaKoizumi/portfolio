// JavaScript Document

$(function () {

  //map レスポンシブ対応
  $('img[usemap]').rwdImageMaps();

  //スマホ版でマップからページ内リンク

  /* ウィンドウサイズが 1160px以下の場合 */
  $('area').click(function () {
    if (window.matchMedia("(max-width: 1160px)").matches) {
      var headerHight = 60;
      var speed = 500;
      var href = $(this).attr("href");
      var target = $(href == "#" || href == "" ? 'html' : href);
      var position = target.offset().top - headerHight;

      $('body,html').animate({
        scrollTop: position
      }, speed, 'swing');
      return false;
    }
  });


  //マップ モーダルウィンドウ
  //テキストを含む一般的なモーダル
  $(".modal-link").modaal({
    overlay_close: false, //モーダル背景クリック時に閉じるか
    overlay_opacity: 0.7,
    hide_close: true,
    background_scroll: false
  });

  var sX_syncerModal = 0;
  var sY_syncerModal = 0;

  $(".modal-link").click(function () {
    var dElm = document.documentElement,
      dBody = document.body;
    sX_syncerModal = dElm.scrollLeft || dBody.scrollLeft; //現在位置のX座標
    sY_syncerModal = dElm.scrollTop || dBody.scrollTop; //現在位置のY座標
  });

  $('.modal-close-button').on('click', function () {
    $('.modal-link').modaal('close');
    window.scrollTo(sX_syncerModal, sY_syncerModal);
  });

});
