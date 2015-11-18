define(["jquery"],function($){
	var popup = popup || {};
	popup.show=function(){
		$("#map-popup").animate({bottom:"0px"},150);

	};
	popup.hide=function(){
		$("#map-popup").animate({bottom:"-80"},150);
	};
	return popup;
});