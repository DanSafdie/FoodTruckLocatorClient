$(document).ready(function(){
	$("#owner-btn").click(function(){
		window.location="trucklogin.html";
	});

	$("#user-btn").click(function(){
		window.location="login.html";
	});

	$("#delete-btn").click(function(){
		var sendInfo=$.get("https://foodinator.herokuapp.com/deletetrucks",function(data){
			console.log(data);
		}); 
	});
	$("#show-btn").click(function(){
		var sendInfo=$.get("https://foodinator.herokuapp.com/showtrucks",function(data){
			console.log(data);
		});
	});
});