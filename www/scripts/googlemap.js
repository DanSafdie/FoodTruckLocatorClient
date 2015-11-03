requirejs(['async!http://maps.google.com/maps/api/js?sensor=false',"jquery","./popup"], function(async,$,pop) {
	var MARKERS=[];

	function sendLocation(lat,lon,callback){
		 // var url =  "http://localhost:8080"; 
		var url = "https://foodinator.herokuapp.com/";
		var USER_ID= window.location.search;
		var params = {"lat":lat,"lon":lon,"userid":USER_ID};

		console.log("In send location");

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
		console.log("in mark locations");
		document.getElementById("num").innerHTML=res.length;
		for(var i=0;i<res.length;i+=1){
			var el=res[i];
			el_lat=parseFloat(el.lat);
			el_lon=parseFloat(el.lon);

			if (!(el_lon==longit && el_lat==latit)){
				var marker=new google.maps.Marker({
					position: {lat:el_lat, lng:el_lon},
					map: map,
					icon: getPin("009933")
				});	
				// marker.addListener('click', function() {
				google.maps.event.addListener(marker, "click", function() {
					pop.show();
				});
				MARKERS.push(marker);
			}
		}
		var marker=new google.maps.Marker({
			position: {lat:latit, lng:longit},
			map: map,
			icon: getPin("0000FF"),
			zIndex: google.maps.Marker.MAX_ZINDEX + 1,
		});	
		MARKERS.push(marker);
		var latLng = marker.getPosition(); // returns LatLng object
		map.setCenter(latLng);

	}

	function onSuccess(position,map) {
		var loc=position;
		var latit=loc.coords.latitude;
		var longit=loc.coords.longitude;

		var to_screen=latit+","+longit;
		var loc_p=document.getElementById("loc").innerHTML=to_screen;
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
	        	{timeout: 3000}
	        );
			$("#popup-close").click(function(){
				pop.hide();
			});

	        // var height=$(window).height();
	        // var width=$(window).width();
	        // $(window).resize(height+200,width+200);
	        google.maps.event.trigger(map, 'resize');
	        console.log($);
	        console.log(pop);
	        FAKETRUCKDATA={
	        	name: "TuckTruck",
	        	tags: ["Western","Mexican","Credit/Debit Accepted"],
	        	message: "TuckTruck serves the best TexMex food this side of the Mississippi. Borritos, burgers and guac all available to you right here in new york city.",
	     		rating: 5,
	     		num_reviews: 1038,
	     		last_seen: "Position is current"
	        }
	        pop.show(FAKETRUCKDATA);

		}
		 
		var showMap = function(){
			var mapOptions = {
				center: {lat: 40.77, lng: -73.96},
				zoom: 12,
				mapTypeId: google.maps.MapTypeId.ROADMAP
			}
			var map = new google.maps.Map(document.getElementById("map"), mapOptions);
			return map;
		}
	}
	initMap();
});