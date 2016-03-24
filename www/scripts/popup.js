define(["jquery","./reporting"],function($,reporting){
	var popup = popup || {};
	// var i=1;
	popup.show=function(){
		$("#map-popup").animate({bottom:"0px"},150);

	};
	popup.hide=function(){
		// if (i%2==0){
			$("#map-popup").animate({bottom:"-80"},150);
		// }
		// i+=1;
	};
	popup.set=function(truckinfo){
		console.log("in popup set");
		console.log(truckinfo);
		$("#namebox").text(truckinfo.tinfo.tname);
		$("#messagetext").text(truckinfo.tinfo.msg);
		$("#tagbox").text(truckinfo.tinfo.tags);
		// $("#namebox").text("Al's Pizza Truck");
		// $("#messagetext").text("Serving the best pizza in nyc!");
		// $("#tagbox").text("[Pizza]   [Bread]   [Pasta]");
		popup.gen_stars(5);
		localStorage.setItem("selected-truck",JSON.stringify(truckinfo));
	}
	popup.gen_stars=function(num){
		star_str="";
		for (var i=0;i<5;i+=1){
			if (i<num){
				star_str+="\u2605";
			}else{
				star_str+="\u2606";
			}
		}
		$("#ratingreview").text(star_str);
	}
	return popup;
});


/*           <div id="namebox">Big Mama's Mexican</div>
          <img id="ratingreview" src= "img/4.5-Stars.png"></img>
           
            <p id="messagetext">Big Mama's Mexican serves the best TexMex food this side of the Mississippi. Burritos, burgers and guac all available to you right here in friendly New York City.
            </p>
          
          <div id="tagbox">
            <div class="tags">Western</div>
            <div class="tags">Mexican</div>
            
          </div>
          <div id="popup-details">Details >></div>
          */