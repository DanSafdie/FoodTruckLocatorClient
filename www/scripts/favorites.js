define(["jquery","nomadic_storage"],function($,NS){
	var favoritesMenu= favoritesMenu || {};
	favoritesMenu.show=function(){
		$("#favorites-list").show();
	};

	favoritesMenu.hide=function(){
		$("#favorites-list").hide();
	};

	favoritesMenu.makeFav=function(truck_info){
		var newfav = document.createElement('p');
		newfav.setAttribute('class',"sub-menu-item-text");
		newfav.innerText=truck_info.tinfo.tname;
		var newdiv = document.createElement('div');
		newdiv.setAttribute('class',"sub-menu-item");
		newdiv.appendChild(newfav);
		return newdiv;
	}
	favoritesMenu.makeLine=function(){
		var line= document.createElement("div");
		line.setAttribute("class","sub-menu-item-line");
		return line
	}

	favoritesMenu.populate=function(truck_infos){
		var fav_list=document.getElementById("favorites-list");
		for (var i=0;i<truck_infos.length;i+=1){
			fav_list.appendChild(favoritesMenu.makeFav(truck_infos[i]));
			fav_list.appendChild(favoritesMenu.makeLine());
		}
	}
	return favoritesMenu;
});