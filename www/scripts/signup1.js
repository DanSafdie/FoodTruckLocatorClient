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
		  	TRUCKPIC=signup_readURL(this,"#signup-truckpicpreview","signup-truckpic-data");
		});
		$("#menupic").change(function(){
		  	MENUPIC=signup_readURL(this,"#signup-menupicpreview","signup-menupic-data");
		});

	  	//Make a taggle thing
		var auto_tags=new Taggle('tags', {
		    tags: [],
		    duplicateTagClass: 'bounce',
		    placeholder: "Write some tags so customers can find you",
		    allowedTags: ALL_TAGS
		});

		//When you select an option from the drop down it appears as a taggle tag.
		$('#tagselect').on('change', function() {
		 	auto_tags.add($("#tagselect").val()); // or $(this).val()
		});
		$("#submit-button").click(function(submit_event){
			var toReturn={};
			toReturn["truckname"]=$("#truckname")[0].value;
			toReturn["tags"]=auto_tags.getTagValues().map(function(x){return x.charAt(0).toUpperCase() + x.slice(1)});
			toReturn["blurb"]=$("#blurb")[0].value;
			toReturn["fname"]=$("#fname")[0].value;
			toReturn["lname"]=$("#lname")[0].value;
			toReturn["email"]=$("#email")[0].value;
			toReturn["phone"]=$("#phone")[0].value;
			toReturn["username"]="?"+($("#username")[0].value);

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


			console.log(JSON.stringify(toReturn));
			// alert("This is where the database call goes! : "+JSON.stringify(toReturn));
			//TODO: LOOK INTO http://sean.is/poppin/tags
			// window.location="login.html";
			
			var sendInfo=$.post("https://foodinator.herokuapp.com/register",JSON.stringify(toReturn),{contentType: "application/json; charset=UTF-8"});

			sendInfo.done(function(){
					navigator.geolocation.getCurrentPosition(
						function(position){
							var firstLocPost=$.post("http://foodinator.herokuapp.com",JSON.stringify(position),{contentType: "application/json; charset=UTF-8"});
							firstLocPost.done(function(){
								alert("Signed you up successfully. Redirecting to App.");
								window.location="truckview.html?"+($("#username")[0].value)+"|1";
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
	});
});