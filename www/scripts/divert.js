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
					"truckpic":"<PICTURE GOES HERE>"
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
					"truckpic":"<PICTURE GOES HERE2>"
					
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
					"truckpic":"<PICTURE GOES HERE3>"
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
					"truckpic":"<PICTURE GOES HERE3>"
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
					"truckpic":"<PICTURE GOES HERE3>"
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
					"truckpic":"<PICTURE GOES HERE3>"
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
					"truckpic":"<PICTURE GOES HERE3>"
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
					"truckpic":"<PICTURE GOES HERE3>"
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
			console.log("added fake trucks");
		});




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