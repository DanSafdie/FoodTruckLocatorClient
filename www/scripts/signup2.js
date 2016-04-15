var getParams=function(){
	qd={}
	location.search.substr(1).split("&").forEach(function(item) {
		qd[item.split("=")[0]] = decodeURIComponent(item.split("=")[1])
	});
	qd["truckname"]=qd["truckname"].replace(/\+/g, ' ');
	var tag_str=qd["tags"].replace(/\+/g, ' ');
	//Split on either comma or space
	qd["tags"]=tag_str.split(/,| /);
	qd["blurb"]=qd["blurb"].replace(/\+/g, ' ');
	return qd;
}
var convert_image=function(image_path){
	var reader = new FileReader();
}

$(document).ready(function(){
	$("#submit-button").click(function(submit_event){
		var toReturn=getParams();

		toReturn["fname"]=$("#fname")[0].value;
		toReturn["lname"]=$("#lname")[0].value;
		toReturn["email"]=$("#email")[0].value;
		toReturn["phone"]=$("#phone")[0].value;
		toReturn["username"]="?"+($("#username")[0].value);
		console.log(JSON.stringify(toReturn));
		// alert("This is where the database call goes! : "+JSON.stringify(toReturn));
		//TODO: LOOK INTO http://sean.is/poppin/tags
		// window.location="login.html";
		
		var sendInfo=$.post("https://foodinator.herokuapp.com/register",JSON.stringify(toReturn),{contentType: "application/json; charset=UTF-8"});

		sendInfo.done(function(){
				navigator.geolocation.getCurrentPosition(
					function(position){
						var firstLocPost=$.post("http://foodinator.herokuapp.com",JSON.stringify(position),{contentType: "application/json; charset=UTF-8"});
						firstLocPost.done(function(){
							alert("Signed you up successfully. Redirecting to App.");
							window.location="truckview.html?"+($("#username")[0].value)+"|1";
							// window.location="trucklogin.html";
						});
						firstLocPost.fail(function( jqXHR, textStatus, errorThrown){
							console.log(textStatus);
							console.log(errorThrown);
							alert("Error!");
						});
					},
					function(error){console.log(error)},
					{timeout: 5000, enableHighAccuracy: true,maximumAge:Infinity}
				);
		});
		sendInfo.fail(function( jqXHR, textStatus, errorThrown){
			console.log(textStatus);
			console.log(errorThrown);
			alert("Error!");
		});
		
	});
});