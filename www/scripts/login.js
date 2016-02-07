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

  /*

<script>
  window.fbAsyncInit = function() {
    FB.init({
      appId      : '977026392390233',
      xfbml      : true,
      version    : 'v2.5'
    });
  };

  (function(d, s, id){
     var js, fjs = d.getElementsByTagName(s)[0];
     if (d.getElementById(id)) {return;}
     js = d.createElement(s); js.id = id;
     js.src = "//connect.facebook.net/en_US/sdk.js";
     fjs.parentNode.insertBefore(js, fjs);
   }(document, 'script', 'facebook-jssdk'));
</script>


  */