var getParams=function(){
	qd={}
	location.search.substr(1).split("&").forEach(function(item) {
		qd[item.split("=")[0]] = decodeURIComponent(item.split("=")[1])
	});
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
		alert("This is where the database call goes! : "+JSON.stringify(toReturn));
		// window.location="login.html";
		var sendInfo=$.post("https://foodinator.herokuapp.com/register",JSON.stringify(toReturn)) 
		// var sendInfo=$.post("http://localhost:8080/register",JSON.stringify(toReturn))
		sendInfo.done(function(){
			alert("nailed it!");
		});
		sendInfo.fail(function(error){
			alert(error);
		});
		window.location="trucklogin.html";
	});
});