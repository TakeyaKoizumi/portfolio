// JavaScript Document

// android用CSS適用
if (navigator.userAgent.indexOf('Android') > 0) {
  let body = document.getElementsByTagName('body')[0];
  body.classList.add('Android');
}

$(function () {
  //スマホ表示 ナビゲーション固定
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

// id指定 ページ遷移時 上30px空ける
$(window).on('load', function () {
  var headerHeight = 30;
  if (document.URL.match('#')) {
    var str = location.href;
    var cut_str = "#";
    var index = str.indexOf(cut_str);
    var href = str.slice(index);
    var target = href;
    var position = $(target).offset().top - headerHeight;
    $("html, body").scrollTop(position);
    return false;
  }
});

// 波の描画

var unit = 100,
  canvasList, // キャンバスの配列
  info = {}, // 全キャンバス共通の描画情報
  colorList; // 各キャンバスの色情報

/**
 * Init function.
 * 
 * Initialize variables and begin the animation.
 */
function init() {
  info.seconds = 0;
  info.t = 0;
  canvasList = [];
  colorList = [];
  // canvas1個めの色指定
  canvasList.push(document.getElementById("waveCanvas"));
  colorList.push(['#005BAC', '#005BAC', '#005BAC']); //重ねる波の色設定
  // 各キャンバスの初期化
  for (var canvasIndex in canvasList) {
    if (canvasList.hasOwnProperty(canvasIndex)) {
      var canvas = canvasList[canvasIndex];
      canvas.width = document.documentElement.clientWidth; //Canvasのwidthをウィンドウの幅に合わせる
      canvas.height = 120; //波の高さ
      canvas.contextCache = canvas.getContext("2d");
    }
  }
  // 共通の更新処理呼び出し
  update();
}

function update() {
  for (var canvasIndex in canvasList) {
    if (canvasList.hasOwnProperty(canvasIndex)) {
      var canvas = canvasList[canvasIndex];
      // 各キャンバスの描画
      draw(canvas, colorList[canvasIndex]);
    }
    // 共通の描画情報の更新
    info.seconds = info.seconds + 0.014;
    info.t = info.seconds * Math.PI;
    // 自身の再起呼び出し
    setTimeout(update, 35);
  }
}

/**
 * Draw animation function.
 * 
 * This function draws one frame of the animation, waits 20ms, and then calls
 * itself again.
 */
function draw(canvas, color) {
  // 対象のcanvasのコンテキストを取得
  var context = canvas.contextCache;
  // キャンバスの描画をクリア
  context.clearRect(0, 0, canvas.width, canvas.height);

  //波の重なりを描画 drawWave(canvas, color[数字（波の数を0から数えて指定）], 透過, 波の幅のzoom,波の開始位置の遅れ )
  drawWave(canvas, color[0], 0.5, 3, 0); //0.5⇒透過具合50%、3⇒数字が大きいほど波がなだらか
  drawWave(canvas, color[1], 0.4, 2, 250);
  drawWave(canvas, color[2], 0.2, 1.6, 100);
}

/**
 * 波を描画
 * drawWave(色, 不透明度, 波の幅のzoom, 波の開始位置の遅れ)
 */
function drawWave(canvas, color, alpha, zoom, delay) {
  var context = canvas.contextCache;
  context.fillStyle = color; //塗りの色
  context.globalAlpha = alpha;
  context.beginPath(); //パスの開始
  drawSine(canvas, info.t / 0.5, zoom, delay);
  context.lineTo(canvas.width + 10, canvas.height); //パスをCanvasの右下へ
  context.lineTo(0, canvas.height); //パスをCanvasの左下へ
  context.closePath(); //パスを閉じる
  context.fill(); //波を塗りつぶす
}

/**
 * Function to draw sine
 * 
 * The sine curve is drawn in 10px segments starting at the origin. 
 * drawSine(時間, 波の幅のzoom, 波の開始位置の遅れ)
 */
function drawSine(canvas, t, zoom, delay) {
  var xAxis = Math.floor(canvas.height / 2);
  var yAxis = 0;
  var context = canvas.contextCache;
  // Set the initial x and y, starting at 0,0 and translating to the origin on
  // the canvas.
  var x = t; //時間を横の位置とする
  var y = Math.sin(x) / zoom;
  context.moveTo(yAxis, unit * y + xAxis); //スタート位置にパスを置く

  // Loop to draw segments (横幅の分、波を描画)
  for (var i = yAxis; i <= canvas.width + 10; i += 10) {
    x = t + (-yAxis + i) / unit / zoom;
    y = Math.sin(x - delay) / 3;
    context.lineTo(i, unit * y + xAxis);
  }
}

init();

// 波の描画ここまで
