requirejs(['async!http://maps.google.com/maps/api/js?key=AIzaSyBnOsVQzm27ZRMqj4VeXFkY9xQXkiMCj2k',"jquery","jquery-ui","jquery-shim","./popup","./main_menu","./filterselect","favorites","reporting","nomadic_storage"], function(async,$,JQUI,JQSHIM,pop,main_menu,filterselect,favorites,reporting,NS) {
	var MARKERS=[];
	var popup_clicked=false;

	function isTruck(){ 
		var search_str = window.location.search.split("|");
		var is_truck_str=search_str[1];

		var is_truck=0;
		if (is_truck_str=="1"){
			is_truck=true;
		}else{
			is_truck=false;
		}
		return is_truck;
	}

	function gps_on(){
		var gps_enabled=$("#myonoffswitch").prop( "checked" );
		return gps_enabled;
	}
	function gps_loop(map){
		console.log("LOOP:"+(new Date().getTime() / 1000 | 0));
		navigator.geolocation.getCurrentPosition(
			function(position){onSuccess(position,map,true)},
			function(error){console.log(error)},
			{timeout: 5000, enableHighAccuracy: true,maximumAge:Infinity}
		);

	}
	function calc_tags(){
		var trucks_names=[];
		var trucks_edited=[];
		for(var i=0;i<MARKERS.length;i+=1){
			var cur_truck=MARKERS[i].customInfo;
			// cur_truck.pic=undefined;
			// cur_truck.menupic=undefined;
			// console.log(cur_truck);
			trucks_names.push(cur_truck.tinfo.tname);
			trucks_edited.push(cur_truck);
		}
		var trucks=trucks_edited;

		// var trucks_names=MARKERS.map(function(mrk){
		// 	return mrk.customInfo.tinfo.tname;
		// });
		// var trucks=MARKERS.map(function(mrk){
		// 	return mrk.customInfo;
		// });
		NS.setItem("trucks",trucks,true);
		$( "#tags" ).autocomplete({
		    source: trucks_names
		});
	}


	function sendLocation(lat,lon,callback){
		// var url =  "http://localhost:8080"; 
		// var url = "https://foodinator.herokuapp.com/";
		var url ="http://foodinator.herokuapp.com";
		var search_str = window.location.search.split("|");
		var USER_ID=search_str[0];
		var is_truck_str=search_str[1];

		var is_truck=0;
		if (is_truck_str=="1"){
			is_truck=true;
		}else{
			is_truck=false;
		}

		var params = {
			"lat":lat,
			"lon":lon,
			"userid":USER_ID,
			"istruck": is_truck
		};

		var xhr = new XMLHttpRequest();
		xhr.open("POST", url, true);

		//Send as text/plain so no preflight OPTIONS bullshit
		xhr.setRequestHeader("Content-type", "text/plain");
		xhr.send(JSON.stringify(params));
		xhr.onreadystatechange=function(){
			if (xhr.readyState ==4){
				if (xhr.status=200){
					callback(xhr.response);
				}else{
					console.log(xhr.status);
				}
			}
		}
	}

	function markLocations(latit,longit,res,map,callback){
		var res=JSON.parse(res);
		// console.log("in mark locations");
		// console.log(res);
		document.getElementById("num").innerHTML=res.length;
		
		var truck_icon = {
		    url: 'img/truck-icon.png',
		    // This marker is 20 pixels wide by 32 pixels high.
		    size: new google.maps.Size(22, 22),
		    // The origin for this image is (0, 0).
		    origin: new google.maps.Point(0, 0),
		    // The anchor for this image is the base of the flagpole at (0, 32).
		    anchor: new google.maps.Point(11, 11)
		  };

		for (var j=0;j<MARKERS.length;j+=1){
			MARKERS[j].setMap(null);
		}
		MARKERS=[];

		var is_truck=isTruck();
		var search_str = window.location.search.split("|");
		var USER_ID=search_str[0];
		console.log(res);
		for(var i=0;i<res.length;i+=1){
			// try{
				// console.log(res);
				var el=res[i];
				el_lat=parseFloat(el.lastpos.lat);
				el_lon=parseFloat(el.lastpos.lon);

				// if (!(el_lon==longit && el_lat==latit)){
				// console.log("ADDING");
				if (filterselect.allow(el.tinfo.tags)){
					var marker=new google.maps.Marker({
						position: {lat:el_lat, lng:el_lon},
						map: map,
						icon: truck_icon,
						customInfo:res[i]
					});	
					// console.log({lat:el_lat, lng:el_lon});
					var test="test";
					marker.addListener('click', function() {
						var custom_info=this.customInfo;
						reporting.report(USER_ID,"TRUCKCLICK",{which:custom_info.name},function(){
							popup_clicked=true;
							pop.set(custom_info);
							pop.show();
						});
					});
					MARKERS.push(marker);
					calc_tags();
				}else{
					console.log("didn't display truck with tags:");
					console.log(el.tinfo.tags);
				}
				// }
			// }catch(err){
			// 	console.log(err);
			// }
		}
		// console.log("adding self to map");
		if (typeof USER_MARKER === "undefined") {
			var current_location_icon = {
			    url: 'img/current-location.png',
			    // This marker is 20 pixels wide by 32 pixels high.
			    size: new google.maps.Size(22, 22),
			    // The origin for this image is (0, 0).
			    origin: new google.maps.Point(0, 0),
			    // The anchor for this image is the base of the flagpole at (0, 32).
			    anchor: new google.maps.Point(11, 11)
			  };
			var marker=new google.maps.Marker({
				position: {lat:latit, lng:longit},
				map: map,
				icon: current_location_icon,
				zIndex: google.maps.Marker.MAX_ZINDEX + 1,
			});	
			// MARKERS.push(marker);
			// var latLng = marker.getPosition(); // returns LatLng object
			//map.setCenter(latLng);
			USER_MARKER=marker;
		}else{
			USER_MARKER.setIcon('img/current-location.png');
			USER_MARKER.setPosition({lat:latit, lng:longit});
		}
		callback();
	}

	function onSuccess(position,map,to_loop) {
		// console.log("in onSucess");
		var loc=position;
		var latit=loc.coords.latitude;
		var longit=loc.coords.longitude;
		sendLocation(latit,longit,function(res){
			markLocations(latit,longit,res,map,function(){
				if (to_loop){
					WATCHID=setTimeout(
						function(){ gps_loop(map)},
						6000
					);
				}
			});
		});
	}

	function getPin(color){
		var pinColor = color;
		var pinImage = new google.maps.MarkerImage("http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|" + pinColor,
		    new google.maps.Size(21, 34),
		    new google.maps.Point(0,0),
		    new google.maps.Point(10, 34));
		return pinImage;
	}
	// setPosition

	function onError(error){
	        alert('code: '    + error.code    + '\n' +
	              'message: ' + error.message + '\n');
	}

	function initMap() {
		console.log("making map");
		var the_map= new GoogleMap();
		var search_str = window.location.search.split("|");
		var USER_ID=search_str[0];
		reporting.report(USER_ID,"LOGIN",{},function(){
			the_map.initialize();
		});
		console.log()
	}

	function GoogleMap(){
		this.initialize = function(){
			var map = showMap();
			gps_loop(map);

			// Hamburger Menu Clicking
			$("#hamburger").click(function(){
				// alert("test1");
				var search_str = window.location.search.split("|");
				var USER_ID=search_str[0];
				reporting.report(USER_ID,"HAMBURGER",{active:true},function(){
					main_menu.show();
				});
			});

			$("#menu-hider").click(function(){
				var search_str = window.location.search.split("|");
				var USER_ID=search_str[0];
				reporting.report(USER_ID,"HAMBURGER",{active:false},function(){
					main_menu.hide();
				});
				// $("#menu").hide();
			});

			$("#refresh").click(function(){
				var search_str = window.location.search.split("|");
				var USER_ID=search_str[0];
				reporting.report(USER_ID,"REFRESH",{},function(){
					navigator.geolocation.getCurrentPosition(
						function(position){onSuccess(position,map,false)},
						function(error){console.log(error)},
						{timeout: 5000, enableHighAccuracy: true,maximumAge:Infinity}
					);
				});
			})
			// Make Filter Drop Down
			$("#filter").click(function(eventinator){
				console.log("Clicked Filter");
				favorites.hide();
				if($("#filter-list").css("display") == "none") {

					$("#filter-list").css("display","inline");
					$("#deals").css("background-color","#ADA397");
					$("#profile").css("background-color","#ADA397");
					// $("#manage-favorites").css("background-color","#ADA397");
					$("#settings").css("background-color","#ADA397");

					// $("#filter").css("background-color","#FDF3E7");
					// $("#filter-list").css("background-color","#FDF3E7");


				} else {

					$("#filter-list").css("display","none");
					$("#deals").css("background-color","#FDF3E7"); //hard coded
					$("#profile").css("background-color","#FDF3E7"); //hard coded
					// $("#manage-favorites").css("background-color","#FDF3E7"); //hard coded
					$("#settings").css("background-color","#FDF3E7"); //hard coded :(
				}
						
					
			});

					//make all menu items close the filter menu if open
			$("#deals, #profile, #manage-favorites, #settings").click(function(){
				if ($("#filter-list").css("display") != "none") {
					$("#filter-list").css("display","none");
					$("#deals").css("background-color","#FDF3E7"); //hard coded
					$("#profile").css("background-color","#FDF3E7"); //hard coded
					// $("#manage-favorites").css("background-color","#FDF3E7"); //hard coded
					$("#settings").css("background-color","#FDF3E7"); //hard coded :(
				}
			});


			$("#manage-favorites").click(function(){
				// console.log(NS.getItem("user-favorites",true));
				var search_str = window.location.search.split("|");
				var USER_ID=search_str[0];
				var sendInfo=$.post("https://foodinator.herokuapp.com/showfavorites",JSON.stringify({userid:USER_ID}),{contentType: "application/json; charset=UTF-8"});
				sendInfo.done(function(data){
					NS.setItem("user-favorites",data,true);
					$("#favorites-list").empty();
					favorites.populate(data);
					favorites.show();
				});
			})
			


			// Filter Selector
			$(".sub-menu-item").click(function(the_event){
				var the_item=the_event.currentTarget.id;

				//ACTIVATE
				if ( $("#"+the_event.currentTarget.children[1].id).css("display") == "none") {
					$("#"+the_event.currentTarget.children[0].id).css("color","black");
					$("#"+the_event.currentTarget.children[1].id).css("display","inline");
					the_item=the_item.charAt(0).toUpperCase() + the_item.slice(1);
					filterselect.add(the_item);

				//DEACTIVATE
				} else {
					$("#"+the_event.currentTarget.children[1].id).css("display","none");
					$("#"+the_event.currentTarget.children[0].id).css("color","#7E8F7C");
					the_item=the_item.charAt(0).toUpperCase() + the_item.slice(1);
					filterselect.remove(the_item);
				}
				// console.log(the_event.currentTarget.id);

				filterselect.announce();
			});

			$("#favorites-list").on("click",".sub-menu-item-fav-text",function(the_event){
				var the_item=the_event.currentTarget;
				var truckid=the_item.getAttribute("data-truckid");
				var fav=favorites.findFav(truckid);
				map.setCenter(new google.maps.LatLng(fav.lastpos.lat, fav.lastpos.lon));
				popup_clicked=true;
				pop.set(fav);
				main_menu.hide();
				pop.show();
			});

			$( "#tags" ).on( "autocompleteselect", function( event, ui ) {
				var trucks= NS.getItem("trucks",true);
				var found_truck=trucks.find(function(x){
					return x.tinfo.tname===ui.item.value;
				});
				map.setCenter(new google.maps.LatLng(found_truck.lastpos.lat, found_truck.lastpos.lon));
				popup_clicked=true;
				pop.set(found_truck);
				main_menu.hide();
				pop.show();
			});

// Bottom Banner Clicking
			$("#map").click(function(){
				console.log("clicked in map");
				if (!popup_clicked){
					pop.hide();
				}else{
					popup_clicked=false;
				}
			})
			$("#truck-map").click(function(){
				console.log("clicked in map");
				pop.hide();
			})
			$("#myonoffswitch").click(function(evt){
				// var gps_enabled=$("#myonoffswitch").prop( "checked" );
				var gps_enabled=gps_on();
				if (gps_enabled){
					gps_loop(map);
				}else{
					clearTimeout(WATCHID);
					USER_MARKER.setIcon('img/gps-off.png');
				}
			});
			// $("#map-popup").click(function(){
			// $("#map-popup").on("swipeup",function(){
			// 	var search_str = window.location.search.split("|");
			// 	var USER_ID=search_str[0];
			// 	window.location="detail.html"+USER_ID;
			// })
			$("#map-popup").on("click",function(){
				var search_str = window.location.search.split("|");
				var USER_ID=search_str[0];
				window.location="detail.html"+USER_ID;
			})
	        google.maps.event.trigger(map, 'resize');
		}
		 
		var showMap = function(){
			var mapOptions = {
				center: {lat: 40.77, lng: -73.96},
				zoom: 12,
				streetViewControl: false,
				mapTypeControl:false,
				mapTypeId: google.maps.MapTypeId.ROADMAP,
				styles:[{
							featureType: "poi",
							elementType: "labels",
							stylers: [
							      { visibility: "off" }
					]}]
				}
			if (document.getElementById("map")){
				var map = new google.maps.Map(document.getElementById("map"), mapOptions);
			}else{
				var map = new google.maps.Map(document.getElementById("truck-map"), mapOptions);
			}
			return map;
		}
	}
	initMap();
});