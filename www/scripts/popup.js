define(["jquery"],function($){
	var popup = popup || {};
	popup.show=function(){
		$("#map-popup").show();
	};
	popup.hide=function(){
		$("#map-popup").hide();
	}
	return popup;
});