define(["jquery"],function($){
	var main_menu = main_menu || {};
	main_menu.show=function(){		
		// $("#menu").show();
		$("#menu").animate({left:"0px"},150);
		// $("#menu").animate({width:"toggle"},2000);
		$("#menu-hider").show();
	};
	main_menu.hide=function(){
		$("#menu").animate({left:"-75vw"},150);
		$("#menu-hider").hide();
	}
	return main_menu;


});
