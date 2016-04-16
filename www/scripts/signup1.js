$(document).ready(function(){
	var ALL_TAGS=["Japanese", "Greek", "Pizza", "American", "Middle Eastern", "Chinese", "Mexican","Korean", "Breakfast","Dessert"];


	var auto_tags=new Taggle('tags', {
	    tags: [],
	    duplicateTagClass: 'bounce',
	    placeholder: "Write some tags so customers can find you (e.g. Tex-Mex, Breakfast, Halal, Korean, Sandwiches)",
	    allowedTags: ALL_TAGS
	});

	var container = auto_tags.getContainer();
	var input = auto_tags.getInput();

	$(input).autocomplete({
	    source: ALL_TAGS ,
	    appendTo: container,
	    position: { at: "left bottom", of: container },
	    select: function(event, data) {
	        event.preventDefault();
	        //Add the tag if user clicks
	        if (event.which === 1) {
	            auto_tags.add(data.item.value);
	        }
	    }
	});

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