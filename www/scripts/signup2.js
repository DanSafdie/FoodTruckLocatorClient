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
		alert("This is where the database call goes! : "+JSON.stringify(toReturn));
		//TODO: LOOK INTO http://sean.is/poppin/tags
		// window.location="login.html";
		
		var sendInfo=$.post("https://foodinator.herokuapp.com/register",JSON.stringify(toReturn),{contentType: "application/json; charset=UTF-8"});

		//var sendInfo=$.post("http://localhost:8080/register",JSON.stringify(toReturn))
		sendInfo.done(function(){
			alert("nailed it!");
			window.location="trucklogin.html";
		});
		sendInfo.fail(function( jqXHR, textStatus, errorThrown){
			console.log(textStatus);
			console.log(errorThrown);
			alert("Error!");
		});
		
	});
});