define(["jquery"],function($){
	var main_menu = main_menu || {};
	main_menu.show=function(){
		$("#menu").show();
		$("#menu-hider").show();
	};
	main_menu.hide=function(){
		$("#menu").hide();
		$("#menu-hider").hide();
	}
	return main_menu;
});