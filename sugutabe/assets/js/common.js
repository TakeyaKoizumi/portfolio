// JavaScript Document
$(function () {

    /*** スライダー（slick） ***/
    //https://kenwheeler.github.io/slick/


      var w = $(window).width();
      
      if(w <= 767){
          $('#slick-slide').not('.slick-slick-initialized').slick({
            variableWidth: true,
            centerMode: true,
            });
            } else {
            $('#slick-slide .slick-slick-initialized').slick('unslick');
        }
          
  
          $(window).on('resize orientationchange', function() {
            $('#slick-slide').slick('resize');
          });
            /*
  
    // 初回チェック
    sliderSetting();

    // ウインドウがリサイズする度にチェック
    $(window).resize( function() {
        sliderSetting();
    })
    */
      
});