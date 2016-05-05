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
});