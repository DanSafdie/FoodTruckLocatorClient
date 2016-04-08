define(["jquery","jquery-shim","nomadic_storage","user_info","reporting"],function($,JQSHIM,NS,UI,reporting){
	var truck_info=localStorage.getItem("selected-truck");
	truck_info=JSON.parse(truck_info);
	var USER_ID = window.location.search;
	reporting.report(USER_ID,"DETAILCLICK",{which:truck_info.name},function(){
		var sendInfo=$.post("https://foodinator.herokuapp.com/showfavorites",JSON.stringify({userid:USER_ID}),{contentType: "application/json; charset=UTF-8"});
		sendInfo.done(function(data){
			NS.setItem("user-favorites",data,true);
			
			var unique_favs=data.map(function(x){
				return x.name;
			});

			//If the truck we're currently looking at is favorited:
			if (unique_favs.indexOf(truck_info.name) > -1){
				$("#detail-favorite").css("display","none");
				$("#detail-unfavorite").css("display","block");
			}else{
				$("#detail-favorite").css("display","block");
				$("#detail-unfavorite").css("display","none");
			}

			document.getElementById("detail-tname").innerText+=truck_info.tinfo.tname;
	//		document.getElementById("detail-photo").innerText+=truck_info.tinfo.pic;
			document.getElementById("detail-location").innerText+=truck_info.lastpos.lat +","+truck_info.lastpos.lon;
			document.getElementById("detail-time").innerText+=truck_info.lastpos.timestamp;
			// document.getElementById("detail-tags").innerText+=truck_info.tinfo.tags;

			var truck_tags=truck_info.tinfo.tags;
			for(var i=0;i<truck_tags.length; i+=1){
				var entry = document.createElement('li');
				entry.setAttribute('class',"tag");
				entry.setAttribute('id',"tag"+(i+1));
				entry.innerText=truck_tags[i];
				// console.log(entry);
				var hook = document.getElementById("detail-tags");
				hook.appendChild(entry);
			} 

			document.getElementById("detail-blurb-header").innerText+=" "+truck_info.tinfo.tname+":";
			document.getElementById("detail-blurb").innerText+=truck_info.tinfo.msg;
			document.getElementById("phone-number").innerText+=" "+truck_info.pinfo.phone;
		});
	});
	var toSend={userid:USER_ID,truckid:truck_info.name};
	$("#detail-favorite").click(function(){
		var sendInfo=$.post("https://foodinator.herokuapp.com/favorite",JSON.stringify(toSend),{contentType: "application/json; charset=UTF-8"});
		$("#detail-favorite").css("display","none");
		$("#detail-unfavorite").css("display","block");
	});
	$("#detail-unfavorite").click(function(){
		var sendInfo=$.post("https://foodinator.herokuapp.com/unfavorite",JSON.stringify(toSend),{contentType: "application/json; charset=UTF-8"});
		$("#detail-favorite").css("display","block");
		$("#detail-unfavorite").css("display","none");
	});
	$("#close-detail").click(function(){
		window.location="mapview.html"+USER_ID+"|0";
	});
});