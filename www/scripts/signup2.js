var getParams=function(){
	qd={}
	location.search.substr(1).split("&").forEach(function(item) {
		qd[item.split("=")[0]] = decodeURIComponent(item.split("=")[1])
	});
	return qd;
 
}

$(document).ready(function(){
	$("#submit-button").click(function(submit_event){
		var toReturn=getParams();
		toReturn["fname"]=$("#fname")[0].value;
		toReturn["lname"]=$("#lname")[0].value;
		toReturn["email"]=$("#email")[0].value;
		alert("This is where the database call goes! : "+JSON.stringify(toReturn));
		window.location="login.html"
	});
});