$(document).ready(function(){
	$("#submit-button").click(function(submit_event){
		var toReturn={};
		toReturn["truckname"]=$("#truckname")[0].value;
		toReturn["tags"]=$("#tags")[0].value;
		toReturn["blurb"]=$("#blurb")[0].value;
		toReturn["truckpic"]=$("#truckpic")[0].value;
		toReturn["city"]=$("#city")[0].value;
		var theParams=$.param(toReturn);
		window.location="signup2.html?"+theParams;
	});
});