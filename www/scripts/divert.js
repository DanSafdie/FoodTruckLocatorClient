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
	$("#delete-report-btn").click(function(){
		var sendInfo=$.get("https://foodinator.herokuapp.com/deletereports",function(data){
			console.log(data);
		}); 
	});
	$("#show-report-btn").click(function(){
		var sendInfo=$.get("https://foodinator.herokuapp.com/showreports",function(data){
			console.log(data);
		});
	});
	$("#delete-users-btn").click(function(){
		var sendInfo=$.get("https://foodinator.herokuapp.com/deleteusers",function(data){
			console.log(data);
		}); 
	});
	$("#show-users-btn").click(function(){
		var sendInfo=$.get("https://foodinator.herokuapp.com/showusers",function(data){
			console.log(data);
		});
	});
});