// JavaScript Document

$( window ).on( 'load', function() {
	var id    = location.hash;
	var speed = 0;
	var headerHight = 70; // 固定ヘッダーの高さ
	if ( '' != id ) {
		var pos = jQuery( id ).offset().top - headerHight;
		jQuery( 'html' ).animate({ scrollTop: pos }, speed );
	}
});
