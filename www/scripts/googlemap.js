requirejs(['async!http://maps.google.com/maps/api/js?sensor=false',"jquery","./popup","./main_menu","./filterselect"], function(async,$,pop,main_menu,filterselect) {
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

	function sendLocation(lat,lon,callback){
		// var url =  "http://localhost:8080"; 
		var url = "https://foodinator.herokuapp.com/";
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

	function markLocations(latit,longit,res,map){
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

		// for (var j=0;j<MARKERS.length;j+=1){
		// 	MARKERS[j].setMap(null);
		// }
		var is_truck=isTruck();
		for(var i=0;i<res.length;i+=1){
			try{
				var el=res[i];
				el_lat=parseFloat(el.lastpos.lat);
				el_lon=parseFloat(el.lastpos.lon);

				// if (!(el_lon==longit && el_lat==latit)){
				console.log("ADDING");
				var marker=new google.maps.Marker({
					position: {lat:el_lat+.01, lng:el_lon+.01},
					map: map,
					icon: truck_icon,
					customInfo:res[i]
				});	
				// console.log({lat:el_lat, lng:el_lon});
				var test="test";
				marker.addListener('click', function() {
				//google.maps.event.addListener(marker, "click", function() {
					popup_clicked=true;
					pop.set(this.customInfo);
					pop.show();
					console.log(this.customInfo);
				});
					// MARKERS.push(marker);
				// }
			}catch(err){
				console.log(err);
			}
		}
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
		var latLng = marker.getPosition(); // returns LatLng object
		//map.setCenter(latLng);

	}

	function onSuccess(position,map) {
		var loc=position;
		var latit=loc.coords.latitude;
		var longit=loc.coords.longitude;

		var to_screen=latit+","+longit;
		// var loc_p=document.getElementById("loc").innerHTML=to_screen;
		var maps_version=google.maps.version;

		sendLocation(latit,longit,function(res){
			markLocations(latit,longit,res,map);
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
		the_map.initialize();
	}

	function GoogleMap(){
		this.initialize = function(){
			var map = showMap();
	        watchID = navigator.geolocation.watchPosition(
	        	function(position){onSuccess(position,map)}, 
	        	onError, 
	        	{timeout: 3000, enableHighAccuracy: true}
	        );


// Hamburger Menu Clicking
			$("#hamburger").click(function(){
				// alert("test1");
				main_menu.show();
			});

			$("#menu-hider").click(function(){
				main_menu.hide();
				// $("#menu").hide();
			});

			// Make Filter Drop Down

			// $("#filter-list").click(function(){
			// 	sub_menu.hide();
			// 	// body...
			// });
			
			$("#filter").click(function(eventinator){
				console.log("I clicked it!")

				if($("#filter-list").css("display") == "none") {

					$("#filter-list").css("display","inline");
					$("#deals").css("background-color","#ADA397");
					$("#profile").css("background-color","#ADA397");
					$("#manage-favorites").css("background-color","#ADA397");
					$("#settings").css("background-color","#ADA397");

					// $("#filter").css("background-color","#FDF3E7");
					// $("#filter-list").css("background-color","#FDF3E7");


				} else {

					$("#filter-list").css("display","none");
					$("#deals").css("background-color","#FDF3E7"); //hard coded
					$("#profile").css("background-color","#FDF3E7"); //hard coded
					$("#manage-favorites").css("background-color","#FDF3E7"); //hard coded
					$("#settings").css("background-color","#FDF3E7"); //hard coded :(
				}
						
					
			});

					//make all menu items close the filter menu if open
			$("#deals, #profile, #manage-favorites, #settings").click(function(){
				if ($("#filter-list").css("display") != "none") {
					$("#filter-list").css("display","none");
					$("#deals").css("background-color","#FDF3E7"); //hard coded
					$("#profile").css("background-color","#FDF3E7"); //hard coded
					$("#manage-favorites").css("background-color","#FDF3E7"); //hard coded
					$("#settings").css("background-color","#FDF3E7"); //hard coded :(
				}
			});




			// Filter Selector
			$(".sub-menu-item").click(function(the_event){
				console.log(the_event)
				if ( $("#"+the_event.currentTarget.children[1].id).css("display") == "none") {

					$("#"+the_event.currentTarget.children[1].id).css("display","inline");
					$("#"+the_event.currentTarget.children[0].id).css("color","#7E8F7C");
				
				} else {

					$("#"+the_event.currentTarget.children[1].id).css("display","none");
					$("#"+the_event.currentTarget.children[0].id).css("color","black");
				}

				filterselect.show();
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
				pop.hide();
			})
			$("#map-popup").click(function(){
				window.location="detail.html";
			})

	        // var height=$(window).height();
	        // var width=$(window).width();
	        // $(window).resize(height+200,width+200);
	        google.maps.event.trigger(map, 'resize');
	        // console.log($);
	        // console.log(pop);
	        FAKETRUCKDATA={
	        	name: "TuckTruck",
	        	tags: ["Western","Mexican","Credit/Debit Accepted"],
	        	message: "TuckTruck serves the best TexMex food this side of the Mississippi. Burritos, burgers and guac all available to you right here in new york city.",
	     		rating: 5,
	     		num_reviews: 1038,
	     		last_seen: "Position is current"
	        }
	        // pop.show(FAKETRUCKDATA);

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