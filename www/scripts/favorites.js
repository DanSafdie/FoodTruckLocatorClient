define(["jquery","nomadic_storage"],function($,NS){
	var favoritesMenu= favoritesMenu || {};
	favoritesMenu.show=function(){
		$("#favorites-list").show();
		// $("#favorites-list").css("display","block");
		// console.log("showing favorites");
	};

	favoritesMenu.hide=function(){
		$("#favorites-list").hide();
		// $("#favorites-list").css("display","none");
	};

	favoritesMenu.findFav=function(truckid){
		var findTruckId=function(x){
			return x.name==truckid;
		}
		var favs=NS.getItem("user-favorites",true);
		var fav=favs.find(findTruckId);
		return fav;
	}

	favoritesMenu.makeFav=function(truck_info){
		var newfav = document.createElement('p');
		newfav.setAttribute('class',"sub-menu-item-fav-text");
		newfav.setAttribute('data-truckid',truck_info.name);
		newfav.innerText=truck_info.tinfo.tname;
		var newdiv = document.createElement('div');
		newdiv.setAttribute('class',"sub-menu-item-fav");
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