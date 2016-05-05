define(["jquery","nomadic_storage","reporting"],function($,NS,reporting){
	$(document).ready(function(){
		OAuth.initialize('s6GkBwYgphGVqzw7xZG2ztdg3b8');
		$("#facebook-login").click(function(){
			OAuth.redirect('facebook', 'http://foodinatorclient.herokuapp.com/www/signup1.html');
		});
		$("#google-login").click(function(){
			OAuth.redirect('google', 'http://foodinatorclient.herokuapp.com/www/signup1.html');
		});
		$("#twitter-login").click(function(){
			OAuth.redirect('twitter', 'http://foodinatorclient.herokuapp.com/www/signup1.html');
		});
	});
	OAuth.callback('google',function(error,success) {
		if (typeof success !== "undefined") {
			success.get("https://www.googleapis.com/oauth2/v1/userinfo?access_token="+success.access_token,{
			}).done(function(data){
				NS.setItem("truckuniqueid",data.id,false);
				window.location="signup1.html";
			});
		}else{
			console.log(error);
		}
	})
	OAuth.callback('twitter',function(error,success) {
		if (typeof success !== "undefined") {
			success.get("https://api.twitter.com/1.1/account/verify_credentials.json",{
			}).done(function(data){
				NS.setItem("truckuniqueid",data.id_str,false);
				window.location="signup1.html";
			});
		}else{
			console.log(error);
		}
	})
	OAuth.callback('facebook',function(error,success) {
		if (typeof success !== "undefined") {
			success.get("https://graph.facebook.com/me?access_token="+success.access_token,{
			}).done(function(data){
				$("#signup-final-submit").click(function(submit_event,data){
					auto_login(data.id,auto_tags,TRUCKPIC,MENUPIC);
				});
			});
		}else{
			console.log(error);
		}
	})
});