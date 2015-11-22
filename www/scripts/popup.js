define(["jquery"],function($){
	var popup = popup || {};
	popup.show=function(){
		$("#map-popup").animate({bottom:"0px"},150);

	};
	popup.hide=function(){
		$("#map-popup").animate({bottom:"-80"},150);
	};
	popup.set=function(truckinfo){
		$("#namebox").text(truckinfo.tinfo.tname);
		$("#messagetext").text(truckinfo.tinfo.msg);
		$("#tagbox").text(truckinfo.tinfo.tags);
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