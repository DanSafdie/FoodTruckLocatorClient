define(["jquery","nomadic_storage"],function($,NS){
	var filterselect = filterselect || {};
	all_filters=["Japanese", "Greek", "Pizza", "American", "Middle Eastern", "Chinese", "Mexican","Korean", "Breakfast"];
	NS.setItem("filter_selected",all_filters,true);
	filterselect.show=function(){
		// console.log("time to show checkmark")
		$("#sub-menu-item-icon").show();

	};

	filterselect.hide=function(){
		// console.log("time to hide checkmark");
		$("#sub-menu-item-icon").hide();
	};

	filterselect.add=function(item){
		var filter_selected=NS.getItem("filter_selected",true);
		if (filter_selected.indexOf(item)==-1){
			filter_selected.push(item);
			NS.setItem("filter_selected",filter_selected,true);
		}else{
			console.log(item+" is already in filter");
		}
	}
	filterselect.remove=function(item){
		var filter_selected=NS.getItem("filter_selected",true);
		var i=filter_selected.indexOf(item);
		if(i!=-1){
			console.log("before splice: "+filter_selected);
			filter_selected.splice(i,1);
			console.log("after splice: "+filter_selected);
			NS.setItem("filter_selected",filter_selected,true);
		}else{
			console.log(item+" wasn't in filter");
		}
	}
	//Do any of the truck tags overlap with what the user is filtering for?
	filterselect.allow=function(arr1){
		arr2=NS.getItem("filter_selected",true);
	    for (var i = 0; i < arr1.length; i++) {
	        for (var z = 0; z < arr2.length; z++) {
	            if (arr1[i] == arr2[z]) {
	                return true;
	            }
	        }
	    }
	    return false;  
	}

	filterselect.announce=function(){
		var filter_selected=NS.getItem("filter_selected",true);
		console.log(filter_selected);
	}
	return filterselect;
});