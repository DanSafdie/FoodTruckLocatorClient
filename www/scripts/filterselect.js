define(["jquery"],function($){
	var filterselect = filterselect || {};
	filterselect.show=function(){
		console.log("time to show checkmark")
		$("#sub-menu-item-icon").show();
	};

	filterselect.hide=function(){
		console.log("time to hide checkmark");
		$("#sub-menu-item-icon").hide();
	};

	return filterselect;
});