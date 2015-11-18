$(document).ready(function(){
	$("#truckloginsubmit").click(function(){
		var username=$("#username").val();
		//TODO: DATABASE VALIDATION FOR USERNAME
		window.location="mapview.html?"+username+"|1";
	});
});