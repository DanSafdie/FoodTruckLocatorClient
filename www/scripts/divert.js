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
					"username":"?FAKE1",
					"fname":"Joes",
					"lname":"Demaggo",
					"email":"jd@hotmail.com",
					"phone":"703-254-4574",
					"truckname":"Joe's Samwhiches",
					"city":"NYC",
					"tags":["Pizza","Chinese"],
					"blurb":"Sammishes. That's what we do here at Joe's. We make the best sammishesh you could ever want. Reuben. Dagwood. Cuban. Caprese. Po'boy. You name it. Joe does it. And prepare to have your little tastebuds begging for more because if Joe's does it right. Joes does it best.",
					"truckpic":""
				},
				{ 	
					"username":"?FAKE2",
					"fname":"Alex",
					"lname":"Regara",
					"email":"alex.regara@outlook.com",
					"phone":"537-574-9463",
					"truckname":"Eggs and Peppers",
					"city":"NYC",
					"tags":["Breakfast","Mexican"],
					"blurb":"Eggs! Pepper! Eggs and Pepper! Together! Forever! when you want eggs, you obviously want peppers. Because we know you're a normal person. Am I right you mofo you? Hell yeah I'm right I'm right as might. Eggs and pepper is the best! Fuck Joe's Sammishes!",
					"truckpic":""
					
				},
				{ 	
					"username":"?FAKE3",
					"fname":"Steve",
					"lname":"Buchemi",
					"email":"coolrapper45@gmail.com",
					"phone":"537-574-9463",
					"truckname":"Raise the Steaks",
					"city":"NYC",
					"tags":["American","Steak","Breakfast"],
					"blurb":"What a great way to start your day! Steaks everywhere! Steaks everytime (always I mean). If you want steaks and you want them done right then look no further. Look right at me! I can see! When theres not a care in the world theres only one thing that matters: Steaks!",
					"truckpic":""
				},
				{ 	
					"username":"?FAKE4",
					"fname":"Jim",
					"lname":"Tester",
					"email":"coolrasdr45@gmail.com",
					"phone":"537-574-9463",
					"truckname":"Jim's Mandatory Fiesta",
					"city":"NYC",
					"tags":["Mexican","Cuban","Breakfast"],
					"blurb":"Look. I'm not here to beat around your bush. I'm here for one thing and one thing only. The mandatory fiesta. You know what I'm talking about that. Oh yes you do. That delicious MayHeeKano food from below the boarder (if ya know what I mean). Were here to hook it up my brother from anotha motha. So sit back, chillax and don't even sweat a thing dawg.",
					"truckpic":""
				},
				{ 	
					"username":"?FAKE5",
					"fname":"Rick",
					"lname":"Sanchez",
					"email":"FuckHumans@gmail.com",
					"phone":"537-574-9463",
					"truckname":"Rick's Rito's",
					"city":"NYC",
					"tags":["Mexican","Gourmet"],
					"blurb":"Listen here buddy. If you want the best damn burrito's on this side of the galaxy then COME ON DOWN! To Rick's Rito Truck. We got burrito's. We got taco's. We got enchiladas! We got you'r mom-chiladas! Ohhh Snap! J play dawg, j play. But for serious. Our hurraches are the bomb diggity. I bet you don't even know what that means you idiot do you? J play again we know you're cool. Just come on down already alright? Cool.",
					"truckpic":""
				},
				{ 	
					"username":"?FAKE6",
					"fname":"Joey",
					"lname":"Balognia's",
					"email":"Balognia@gmail.com",
					"phone":"537-574-9463",
					"truckname":"The Italian Stalion",
					"city":"NYC",
					"tags":["American","Italian","Late Night"],
					"blurb":"Italian time! Or not. You're call. I'm a pretty chill guy so if you want italian come by but if not that's cool. Also don't forget to add me on tinder @Eye-talianStallion",
					"truckpic":""
				},
				{ 	
					"username":"?FAKE7",
					"fname":"tim",
					"lname":"tom's",
					"email":"Balognia@gmail.com",
					"phone":"537-574-9463",
					"truckname":"Tim-Tom's Ice Cream",
					"city":"NYC",
					"tags":["Dessert"],
					"blurb":"When your feeling kinda hot and sweaty all around; Don't forget your Ice Cream man, just come on- come on down. The ice cream man is here to stay he's gonna have a wonderful day. Vanilla chocolcate and strawberry cake. These flavors will all melt away",
					"truckpic":""
				},
				{ 	
					"username":"?FAKE8",
					"fname":"Henry",
					"lname":"Rice's",
					"email":"Balognia@gmail.com",
					"phone":"537-574-9463",
					"truckname":"Henry's Heros",
					"city":"NYC",
					"tags":["Greek"],
					"blurb":"Ayo Yo Ma! That's what we say here when we use chinese food to satisfy our customer's voracious hunger pangs. So eat it! And let us use our chinese food on you",
					"truckpic":""
				},
				{ 	
					"username":"?FAKE9",
					"fname":"ct",
					"lname":"ct",
					"email":"ct@cornell.edu",
					"phone":"333-555-7777",
					"truckname":"The Tech Truck",
					"city":"NYC",
					"tags":["American"],
					"blurb":"This truck doesn't actually sell food. Just tech here.",
					"menupic":"data:image/jpeg;base64,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…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",
					"truckpic":"data:image/jpeg;base64,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…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"
				}
					
		];
		var fake_locs=[
			{
				"lat":(40.7803505-.01),
				"lon":-73.9537167,
				"userid":"?FAKE1",
				"istruck": true
			},
			{
				"lat":40.7803505,
				"lon":(-73.9537167-.01),
				"userid":"?FAKE2",
				"istruck": true
			},
			{
				"lat":(40.7803505+.01),
				"lon":-73.9537167,
				"userid":"?FAKE3",
				"istruck": true
			},
			{
				"lat":40.732077,
				"lon":-74.003804,
				"userid":"?FAKE4",
				"istruck": true
			},
			{
				"lat":40.737598,
				"lon":-73.992852,
				"userid":"?FAKE5",
				"istruck": true
			},
			{
				"lat":40.745336,
				"lon":-73.991001,
				"userid":"?FAKE6",
				"istruck": true
			},
			{
				"lat":(40.726709),
				"lon":-73.998520,
				"userid":"?FAKE7",
				"istruck": true
			},
			{
				"lat":(40.736299),
				"lon":-73.982849,
				"userid":"?FAKE8",
				"istruck": true
			},
			{
				"lat":40.741234,
				"lon":-74.00199,
				"userid":"?FAKE9",
				"istruck": true
			}
		]
		var sendInfo=$.post("https://foodinator.herokuapp.com/register",JSON.stringify(fakeTrucks[0]),{contentType: "application/json; charset=UTF-8"});
		sendInfo.done(function(){
		var sendInfo2=$.post("https://foodinator.herokuapp.com/register",JSON.stringify(fakeTrucks[1]),{contentType: "application/json; charset=UTF-8"});
		sendInfo2.done(function(){
		var sendInfo3=$.post("https://foodinator.herokuapp.com/register",JSON.stringify(fakeTrucks[2]),{contentType: "application/json; charset=UTF-8"});
		sendInfo3.done(function(){
		var sendInfo4=$.post("https://foodinator.herokuapp.com/register",JSON.stringify(fakeTrucks[3]),{contentType: "application/json; charset=UTF-8"});
		sendInfo4.done(function(){
		var sendInfo5=$.post("https://foodinator.herokuapp.com/register",JSON.stringify(fakeTrucks[4]),{contentType: "application/json; charset=UTF-8"});
		sendInfo5.done(function(){
		var sendInfo6=$.post("https://foodinator.herokuapp.com/register",JSON.stringify(fakeTrucks[5]),{contentType: "application/json; charset=UTF-8"});
		sendInfo6.done(function(){
		var sendInfo7=$.post("https://foodinator.herokuapp.com/register",JSON.stringify(fakeTrucks[6]),{contentType: "application/json; charset=UTF-8"});
		sendInfo7.done(function(){
		var sendInfo8=$.post("https://foodinator.herokuapp.com/register",JSON.stringify(fakeTrucks[7]),{contentType: "application/json; charset=UTF-8"});
		sendInfo8.done(function(){
		var sendInfo9=$.post("https://foodinator.herokuapp.com/register",JSON.stringify(fakeTrucks[8]),{contentType: "application/json; charset=UTF-8"});
		sendInfo9.done(function(){
						
		var sendInfob=$.post("https://foodinator.herokuapp.com",JSON.stringify(fake_locs[0]),{contentType: "application/json; charset=UTF-8"});
		sendInfob.done(function(){
		var sendInfob2=$.post("https://foodinator.herokuapp.com",JSON.stringify(fake_locs[1]),{contentType: "application/json; charset=UTF-8"});
		sendInfob2.done(function(){
		var sendInfob3=$.post("https://foodinator.herokuapp.com",JSON.stringify(fake_locs[2]),{contentType: "application/json; charset=UTF-8"});
		sendInfob3.done(function(){
		var sendInfob4=$.post("https://foodinator.herokuapp.com",JSON.stringify(fake_locs[3]),{contentType: "application/json; charset=UTF-8"});
		sendInfob4.done(function(){
		var sendInfob5=$.post("https://foodinator.herokuapp.com",JSON.stringify(fake_locs[4]),{contentType: "application/json; charset=UTF-8"});
		sendInfob5.done(function(){
		var sendInfob6=$.post("https://foodinator.herokuapp.com",JSON.stringify(fake_locs[5]),{contentType: "application/json; charset=UTF-8"});
		sendInfob6.done(function(){
		var sendInfob7=$.post("https://foodinator.herokuapp.com",JSON.stringify(fake_locs[6]),{contentType: "application/json; charset=UTF-8"});
		sendInfob7.done(function(){
		var sendInfob8=$.post("https://foodinator.herokuapp.com",JSON.stringify(fake_locs[7]),{contentType: "application/json; charset=UTF-8"});
		sendInfob8.done(function(){
		var sendInfob9=$.post("https://foodinator.herokuapp.com",JSON.stringify(fake_locs[8]),{contentType: "application/json; charset=UTF-8"});
		sendInfob9.done(function(){
			console.log("added fake trucks");
		});


		sendInfob9.fail(function( jqXHR, textStatus, errorThrown){
			console.log(textStatus);
			console.log(errorThrown);
			alert("Error!");
		});});
		sendInfob8.fail(function( jqXHR, textStatus, errorThrown){
			console.log(textStatus);
			console.log(errorThrown);
			alert("Error!");
		});});
		sendInfob7.fail(function( jqXHR, textStatus, errorThrown){
			console.log(textStatus);
			console.log(errorThrown);
			alert("Error!");
		});});
		sendInfob6.fail(function( jqXHR, textStatus, errorThrown){
			console.log(textStatus);
			console.log(errorThrown);
			alert("Error!");
		});});
		sendInfob5.fail(function( jqXHR, textStatus, errorThrown){
			console.log(textStatus);
			console.log(errorThrown);
			alert("Error!");
		});});
		sendInfob4.fail(function( jqXHR, textStatus, errorThrown){
			console.log(textStatus);
			console.log(errorThrown);
			alert("Error!");
		});});
		sendInfob3.fail(function( jqXHR, textStatus, errorThrown){
			console.log(textStatus);
			console.log(errorThrown);
			alert("Error!");
		});});
		sendInfob2.fail(function( jqXHR, textStatus, errorThrown){
			console.log(textStatus);
			console.log(errorThrown);
			alert("Error!");
		});});
		sendInfob.fail(function( jqXHR, textStatus, errorThrown){
			console.log(textStatus);
			console.log(errorThrown);
			alert("Error!");
		});});

		sendInfo9.fail(function( jqXHR, textStatus, errorThrown){
			console.log(textStatus);
			console.log(errorThrown);
			alert("Error!");
		});});
		sendInfo8.fail(function( jqXHR, textStatus, errorThrown){
			console.log(textStatus);
			console.log(errorThrown);
			alert("Error!");
		});});
		sendInfo7.fail(function( jqXHR, textStatus, errorThrown){
			console.log(textStatus);
			console.log(errorThrown);
			alert("Error!");
		});});							
		sendInfo6.fail(function( jqXHR, textStatus, errorThrown){
			console.log(textStatus);
			console.log(errorThrown);
			alert("Error!");
		});});
		sendInfo5.fail(function( jqXHR, textStatus, errorThrown){
			console.log(textStatus);
			console.log(errorThrown);
			alert("Error!");
		});});
		sendInfo4.fail(function( jqXHR, textStatus, errorThrown){
			console.log(textStatus);
			console.log(errorThrown);
			alert("Error!");
		});});
		sendInfo3.fail(function( jqXHR, textStatus, errorThrown){
			console.log(textStatus);
			console.log(errorThrown);
			alert("Error!");
		});});
		sendInfo2.fail(function( jqXHR, textStatus, errorThrown){
			console.log(textStatus);
			console.log(errorThrown);
			alert("Error!");
		});});
		sendInfo.fail(function( jqXHR, textStatus, errorThrown){
			console.log(textStatus);
			console.log(errorThrown);
			alert("Error!");
		});});
});