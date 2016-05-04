$(document).ready(function(){
	$("#truckloginsubmit").click(function(){
		var username=$("#username").val();
		//TODO: DATABASE VALIDATION FOR USERNAME
		window.location="truckview.html?"+username+"|1";
	});
	$("#trucklogin-signup").click(function(){
		window.location="signup1.html";
	});
	OAuth.initialize('s6GkBwYgphGVqzw7xZG2ztdg3b8');

	$("#facebook-login").click(function(){
		OAuth.redirect('facebook', 'http://foodinatorclient.herokuapp.com/www/trucklogin.html');
	});
	$("#google-login").click(function(){
		OAuth.redirect('google', 'http://foodinatorclient.herokuapp.com/www/trucklogin.html');
	});
	$("#twitter-login").click(function(){
		OAuth.redirect('twitter', 'http://foodinatorclient.herokuapp.com/www/trucklogin.html');
	});
	OAuth.callback('google',function(error,success) {
		if (typeof success !== "undefined") {
			success.get("https://www.googleapis.com/oauth2/v1/userinfo?access_token="+success.access_token,{
			}).done(function(data){
				window.location="truckview.html?"+data.id+"|1";
			});
		}else{
			console.log(error);
		}
	})
	OAuth.callback('twitter',function(error,success) {
		if (typeof success !== "undefined") {
			success.get("https://api.twitter.com/1.1/account/verify_credentials.json",{
			}).done(function(data){
				window.location="truckview.html?"+data.id_str+"|1";
			});
		}else{
			console.log(error);
		}
	})
	OAuth.callback('facebook',function(error,success) {
		if (typeof success !== "undefined") {
			success.get("https://graph.facebook.com/me?access_token="+success.access_token,{
			}).done(function(data){
				window.location="truckview.html?"+data.id+"|1";
			});
		}else{
			console.log(error);
		}
	})
});