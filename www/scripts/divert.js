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
	$("#test-trucks-btn").click(function(){
		console.log("Pressed add tests");
		var fakeTrucks=[
				{ 	
					"username":"FAKE1",
					"fname":"Joes",
					"lname":"Demaggo",
					"email":"jd@hotmail.com",
					"phone":"703-254-4574",
					"truckname":"Joe's Samwhiches",
					"city":"NYC",
					"tags":["Pizza","Chinese"],
					"blurb":"Joes does it best.",
					"truckpic":"<PICTURE GOES HERE>"
				},
				{ 	
					"username":"FAKE2",
					"fname":"Alex",
					"lname":"Regara",
					"email":"alex.regara@outlook.com",
					"phone":"537-574-9463",
					"truckname":"Eggs and Peppers",
					"city":"NYC",
					"tags":["Breakfast","Mexican"],
					"blurb":"Eggs and pepper is the best",
					"truckpic":"<PICTURE GOES HERE2>"
					
				},
				{ 	
					"username":"FAKE3",
					"fname":"Steve",
					"lname":"Buchemi",
					"email":"coolrapper45@gmail.com",
					"phone":"537-574-9463",
					"truckname":"Raise the Steaks",
					"city":"NYC",
					"tags":["American","Korean","Breakfast"],
					"blurb":"What a great way to start your day! Steaks everywhere!",
					"truckpic":"<PICTURE GOES HERE3>"
				}
		];
		var fake_locs=[
			{
				"lat":(40.7803505-.01),
				"lon":-73.9537167,
				"userid":"FAKE1",
				"istruck": true
			},
			{
				"lat":40.7803505,
				"lon":(-73.9537167-.01),
				"userid":"FAKE2",
				"istruck": true
			},
			{
				"lat":(40.7803505+.01),
				"lon":-73.9537167,
				"userid":"FAKE3",
				"istruck": true
			}
		]
			var sendInfo=$.post("https://foodinator.herokuapp.com/register",JSON.stringify(fakeTrucks[0]),{contentType: "application/json; charset=UTF-8"});
			sendInfo.done(function(){
				var sendInfo2=$.post("https://foodinator.herokuapp.com/register",JSON.stringify(fakeTrucks[1]),{contentType: "application/json; charset=UTF-8"});
				sendInfo2.done(function(){
					var sendInfo3=$.post("https://foodinator.herokuapp.com/register",JSON.stringify(fakeTrucks[2]),{contentType: "application/json; charset=UTF-8"});
					sendInfo3.done(function(){
						var sendInfo4=$.post("https://foodinator.herokuapp.com",JSON.stringify(fake_locs[0]),{contentType: "application/json; charset=UTF-8"});
						sendInfo4.done(function(){
							var sendInfo5=$.post("https://foodinator.herokuapp.com",JSON.stringify(fake_locs[1]),{contentType: "application/json; charset=UTF-8"});
							sendInfo5.done(function(){
								var sendInfo6=$.post("https://foodinator.herokuapp.com",JSON.stringify(fake_locs[2]),{contentType: "application/json; charset=UTF-8"});
								sendInfo6.done(function(){
									console.log("added fake trucks");
								});
								sendInfo6.fail(function( jqXHR, textStatus, errorThrown){
									console.log(textStatus);
									console.log(errorThrown);
									alert("Error!");
								});
							});
							sendInfo5.fail(function( jqXHR, textStatus, errorThrown){
								console.log(textStatus);
								console.log(errorThrown);
								alert("Error!");
							});
						});
						sendInfo4.fail(function( jqXHR, textStatus, errorThrown){
							console.log(textStatus);
							console.log(errorThrown);
							alert("Error!");
						});
					});
					sendInfo3.fail(function( jqXHR, textStatus, errorThrown){
						console.log(textStatus);
						console.log(errorThrown);
						alert("Error!");
					});
				});
				sendInfo2.fail(function( jqXHR, textStatus, errorThrown){
					console.log(textStatus);
					console.log(errorThrown);
					alert("Error!");
				});
			});

			sendInfo.fail(function( jqXHR, textStatus, errorThrown){
				console.log(textStatus);
				console.log(errorThrown);
				alert("Error!");
			});
	});
});