define(["jquery"],function($){
	var popup = popup || {};
	popup.show=function(){
		$("#map-popup").show();
		$("#map").height("80%");
	};
	popup.hide=function(){
		$("#map").height("93%");
		$("#map-popup").hide();
	}
	return popup;
});