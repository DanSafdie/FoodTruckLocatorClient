define(["jquery","nomadic_storage","jquery-ui","reporting"],function($,NS,JQUI,reporting){
	function signup_readURL(input,imgDisplayID,ns_store_id) {

	    if (input.files && input.files[0]) {
	        var reader = new FileReader();
	        reader.onload = function (e) {
	            $(imgDisplayID).attr('src', e.target.result);
	            // NS.setItem(ns_store_id,e.target.result,true);
	        }
	        reader.readAsDataURL(input.files[0]);
	        // console.log(input.files[0]);
	        return reader;
	    }
	}
	function auto_login(truck_id,auto_tags,TRUCKPIC,MENUPIC){
		$(document).ready(function(){
			var toReturn={};
			toReturn["truckname"]=$("#truckname")[0].value;
			toReturn["tags"]=auto_tags.getTagValues().map(function(x){return x.charAt(0).toUpperCase() + x.slice(1)});
			toReturn["blurb"]=$("#blurb")[0].value;
			toReturn["fname"]="";
			toReturn["lname"]="";
			toReturn["email"]="";
			toReturn["phone"]="";
			toReturn["username"]="?"+truck_id;

			if (typeof TRUCKPIC.result !== "undefined") {
				toReturn["truckpic"]=TRUCKPIC.result;
			}else{
				toReturn["truckpic"]="";
			}

			if (typeof MENUPIC.result !== "undefined") {
				toReturn["menupic"]=MENUPIC.result;
			}else{
				toReturn["menupic"]="";
			}

			console.log($("#blurb")[0].value);
			console.log(JSON.stringify(toReturn));
			// alert("This is where the database call goes! : "+JSON.stringify(toReturn));
			//TODO: LOOK INTO http://sean.is/poppin/tags
			// window.location="login.html";
			
			var sendInfo=$.post("http://foodinator.herokuapp.com/register",JSON.stringify(toReturn),{contentType: "application/json; charset=UTF-8"});

			sendInfo.done(function(){
					navigator.geolocation.getCurrentPosition(
						function(position){
							var firstLocPost=$.post("http://foodinator.herokuapp.com",JSON.stringify(position),{contentType: "application/json; charset=UTF-8"});
							firstLocPost.done(function(){
								alert("Signed you up successfully. Redirecting to App.");
								// window.location="truckview.html?"+truck_id+"|1";
								// window.location="trucklogin.html";
							});
							firstLocPost.fail(function( jqXHR, textStatus, errorThrown){
								console.log(textStatus);
								console.log(errorThrown);
								alert("Error!");
							});
						},
						function(error){console.log(error)},
						{timeout: 5000, enableHighAccuracy: true,maximumAge:Infinity}
					);
			});
			sendInfo.fail(function( jqXHR, textStatus, errorThrown){
				console.log(textStatus);
				console.log(errorThrown);
				alert("Error!");
			});
		});
	}


	$(document).ready(function(){

		//All allowed tags, for now must be capitalized
		var ALL_TAGS=["Japanese", "Greek", "Pizza", "American", "Middle Eastern", "Chinese", "Mexican","Korean", "Breakfast","Dessert"];

		//Add them as options to the drop down
	  	for(var i=0; i<ALL_TAGS.length;i+=1){
		  	$('#tagselect').append($('<option/>', { 
		        value: ALL_TAGS[i],
		        text : ALL_TAGS[i] 
		    }));
	  	}

	  	var TRUCKPIC=0;
	  	var MENUPIC=0;

		$("#truckpic").change(function(){
			$("#truckpiclabel").css("display","none");
		  	TRUCKPIC=signup_readURL(this,"#signup-truckpicpreview","signup-truckpic-data");
		});
		$("#menupic").change(function(){
		  	MENUPIC=signup_readURL(this,"#signup-menupicpreview","signup-menupic-data");
			$("#menupiclabel").css("display","none");
		});

	  	//Make a taggle thing
		var auto_tags=new Taggle('tags', {
		    tags: [],
		    duplicateTagClass: 'bounce',
		    placeholder: "Choose some tags below",
		    allowedTags: ALL_TAGS
		});

		//When you select an option from the drop down it appears as a taggle tag.
		$('#tagselect').on('change', function() {
		 	auto_tags.add($("#tagselect").val()); // or $(this).val()
		});

		OAuth.initialize('s6GkBwYgphGVqzw7xZG2ztdg3b8');
		OAuth.callback('google',function(error,success) {
			if (typeof success !== "undefined") {
				success.get("https://www.googleapis.com/oauth2/v1/userinfo?access_token="+success.access_token,{
				}).done(function(data){
					$("#signup-final-submit").click(function(submit_event){
						auto_login(data.id_str,auto_tags,TRUCKPIC,MENUPIC);
					});
				});
			}else{
				console.log(error);
			}
		})
		OAuth.callback('twitter',function(error,success) {
			if (typeof success !== "undefined") {
				success.get("https://api.twitter.com/1.1/account/verify_credentials.json",{
				}).done(function(data){
					$("#signup-final-submit").click(function(submit_event){
						auto_login(data.id_str,auto_tags,TRUCKPIC,MENUPIC);
					});
				});
			}else{
				console.log(error);
			}
		})
		OAuth.callback('facebook',function(error,success) {
			if (typeof success !== "undefined") {
				success.get("https://graph.facebook.com/me?access_token="+success.access_token,{
				}).done(function(data){
					$("#signup-final-submit").click(function(submit_event){
						auto_login(data.id_str,auto_tags,TRUCKPIC,MENUPIC);
					});
				});
			}else{
				console.log(error);
			}
		})

	});
});