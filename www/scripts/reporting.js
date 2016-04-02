define(["jquery"],function($){
	var reporting = reporting || {};
	//Allowed values:
	//	who
	//		<USERID>
	//	what
	//		LOGIN-
	//		LOGOUT
	//		HAMBURGER-
	//			active: <ONOFF>
	//		FILTER-
	//			active: <ONOFF>
	//			which: <WHICH FILTER>
	//		TRUCKCLICK-
	//			which: <TRUCKID>
	//		DETAILCLICK-
	//			which: <TRUCKID>
	//		REFRESH-
	//		CHANGEGPS
	//			<ONOFF>
	//		PUSHTOSOCIAL
	//
	reporting.report=function(who,what,extra_info,callback){
		var toSend={
			"who":who,
			"what":what,
			"extrainfo":extra_info,
		}
		var sendInfo=$.post("https://foodinator.herokuapp.com/report",JSON.stringify(toSend),{contentType: "application/json; charset=UTF-8"});
		sendInfo.done(function(){
			console.log("[Report] WHO:"+who+" WHAT:"+what);
		});
		sendInfo.fail(function( jqXHR, textStatus, errorThrown){
			console.log(textStatus);
			console.log(errorThrown);
			alert("Error in Reporting");
		});
		sendInfo.always(function(){
			callback();
		});

	}
	return reporting;

});