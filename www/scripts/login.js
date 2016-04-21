$(document).ready(function(){
	OAuth.initialize('s6GkBwYgphGVqzw7xZG2ztdg3b8');
	$("#facebook-login").click(function(){
		OAuth.popup('facebook').done(function(facebook) {
			window.location="mapview.html?"+facebook.access_token+"|0";
		}).fail(function(err) {
		  console.log(err);
		});
	});
	$("#google-login").click(function(){
		OAuth.redirect('google', 'http://foodinatorclient.herokuapp.com/www/login.html');
		//in your callback page (can be the same page)
		OAuth.callback('google').done(function(google) {
			console.log(google);
		}).fail(function(err) {
			console.log(err);
		})
		// OAuth.popup('google').done(function(google) {
		// 	window.location="mapview.html?"+google.access_token+"|0";
		// }).fail(function(err) {
		//   console.log(err);
		// });
	});
	$("#twitter-login").click(function(){
		OAuth.popup('twitter').done(function(twitter) {
		    window.location="mapview.html?"+twitter.oauth_token+"|0";
		}).fail(function(err) {
		  console.log(err);
		});
	});
});




function onGoogleSignIn(googleUser) {
	// Useful data for your client-side scripts:
	var profile = googleUser.getBasicProfile();
	// console.log("ID: " + profile.getId()); // Don't send this directly to your server!
	// console.log("Name: " + profile.getName());
	// console.log("Image URL: " + profile.getImageUrl());
	// console.log("Email: " + profile.getEmail());

	// The ID token you need to pass to your backend:
	var id_token = googleUser.getAuthResponse().id_token;
	//console.log("ID Token: " + id_token);
	document.getElementById("CLIENTID").innerHTML=profile.getId();
	//localStorage.setItem("user-info",profile.getId());
	window.location="mapview.html?"+profile.getId()+"|0";
}; 

function renderButton() {
  gapi.signin2.render('my-signin2', {
    'scope': 'https://www.googleapis.com/auth/plus.login',
    'width': 500,
    'height': 50,
    'longtitle': true,
    'theme': 'dark',
    'onsuccess': onGoogleSignIn,
    'onfailure': function(){console.log("failure");}
      });
  }