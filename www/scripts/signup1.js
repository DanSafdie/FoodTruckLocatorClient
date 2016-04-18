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

	//Send things to the next page when you submit
	$("#submit-button").click(function(submit_event){
		var toReturn={};
		toReturn["truckname"]=$("#truckname")[0].value;
		// toReturn["tags"]=$("#tags")[0].value;
		toReturn["tags"]=auto_tags.getTagValues().map(function(x){return x.charAt(0).toUpperCase() + x.slice(1)}).join();       
		toReturn["blurb"]=$("#blurb")[0].value;
		toReturn["truckpic"]=$("#truckpic")[0].value;
		// toReturn["city"]=$("#city")[0].value;
		var theParams=$.param(toReturn);
		window.location="signup2.html?"+theParams;
	});
});