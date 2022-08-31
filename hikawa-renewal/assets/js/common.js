// JavaScript Document

$(function () {
  //ヘッダーナビゲーション固定
  var menu = $('.header__navigation'),
    offset = menu.offset();
  $(window).scroll(function () {
    if ($(window).scrollTop() > offset.top) {
      menu.addClass('fixed');
    } else {
      menu.removeClass('fixed');
    }
  });

  let topBtn = $('#scroll-top');
  topBtn.hide();

  //上に戻るボタン
  // ある程度スクロールされたら、上に戻るボタンを表示する
  $(window).scroll(function () {
    // eslint-disable-next-line no-console
    console.log($(this).scrollTop());
    // eslint-disable-next-line no-console
    console.log($(this).height());

    if ($(this).scrollTop() > 400) {
      topBtn.fadeIn(); // フェードインで表示
    } else {
      topBtn.fadeOut(); // フェードアウトで非表示
    }
  });

  topBtn.on("click", function (event) {
    event.preventDefault(); // ページ内リンクの挙動をキャンセル
    $('body,html').animate({ // スムーズにスクロールする設定
      scrollTop: 0
    }, 500);
  });

  // ナビゲーションメニュー
  $(".open-button").click(function () { //openボタンがクリックされたら
    $(".close-button").toggleClass('active'); //closeボタンに activeクラスを付与し
    $(".header__navigation, .navigation-filter").toggleClass('panelactive'); //ナビゲーションにpanelactiveクラスを付与
  });

  $(".close-button, .navigation-filter").click(function () { //closeボタンがクリックされたら
    $(this).removeClass('active'); //ボタンの activeクラスを除去し
    $(".header__navigation, .navigation-filter").removeClass('panelactive'); //ナビゲーションのpanelactiveクラスも除去
  });

  $(".header__navigation a").click(function () { //ナビゲーションのリンクがクリックされたら
    $(".close-button").removeClass('active'); //ボタンの activeクラスを除去し
    $(".header__navigation, .navigation-filter").removeClass('panelactive'); //ナビゲーションのpanelactiveクラスも除去
  });

});
