define(["jquery","user_info","reporting"],function($,UI,reporting){
	var truck_info=localStorage.getItem("selected-truck");
	truck_info=JSON.parse(truck_info);
	var USER_ID = window.location.search;
	reporting.report(USER_ID,"DETAILCLICK",{which:truck_info.name},function(){
		document.getElementById("detail-tname").innerText+=truck_info.tinfo.tname;
		document.getElementById("detail-photo").innerText+=truck_info.tinfo.pic;
		document.getElementById("detail-location").innerText+=truck_info.lastpos.lat +","+truck_info.lastpos.lon;
		document.getElementById("detail-time").innerText+=truck_info.lastpos.timestamp;
		document.getElementById("detail-tags").innerText+=truck_info.tinfo.tags;
		document.getElementById("detail-blurb").innerText+=truck_info.tinfo.msg;
	});
	var toSend={userid:USER_ID,truckid:truck_info.name};
	$("#detail-favorite").click(function(){
		var sendInfo=$.post("https://foodinator.herokuapp.com/favorite",JSON.stringify(toSend),{contentType: "application/json; charset=UTF-8"});
	});
});