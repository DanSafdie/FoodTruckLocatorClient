$(document).ready(function(){
	$("#truckloginsubmit").click(function(){
		var username=$("#username").val();
		//TODO: DATABASE VALIDATION FOR USERNAME
		window.location="truckview.html?"+username+"|1";
	});
	$("#trucklogin-signup").click(function(){
		window.location="signup1.html";
	});
});