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
			window.location="truckview.html?"+success.access_token+"|1";
		}else{
			console.log(error);
		}
	});
	OAuth.callback('twitter',function(error,success) {
		if (typeof success !== "undefined") {
			// success.post('/1.1/statuses/update.json', {
	  // 			data: {
	  //   			status: "hello world!"
	  // 			}
			// });
			window.location="truckview.html?"+success.oauth_token+"|1";
		}else{
			console.log(error);
		}
	});
	OAuth.callback('facebook',function(error,success) {
		if (typeof success !== "undefined") {
			// console.log(success);
			// success.post("/me/feed", {
	  // 			message: "hello world!"
			// });
			window.location="truckview.html?"+success.access_token+"|1";
		}else{
			console.log(error);
		}
	});
});