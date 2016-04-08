define(["jquery","user_info","reporting"],function($,UI,reporting){
	var truck_info=localStorage.getItem("selected-truck");
	truck_info=JSON.parse(truck_info);
	var USER_ID = window.location.search;
	reporting.report(USER_ID,"DETAILCLICK",{which:truck_info.name},function(){
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
		document.getElementById("phone-number").innerText+=" "+truck_info.tinfo.phone;
	});
	var toSend={userid:USER_ID,truckid:truck_info.name};
	$("#detail-favorite").click(function(){
		var sendInfo=$.post("https://foodinator.herokuapp.com/favorite",JSON.stringify(toSend),{contentType: "application/json; charset=UTF-8"});
	});
});