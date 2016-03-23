define(["jquery"],function($){
	var reporting = reporting || {};
	//Allowed values:
	//	who
	//		<USERID>
	//		<ISTRUCK>
	//	when
	//		<TIMESTAMP>
	//	what
	//		LOGIN-
	//		LOGOUT
	//		HAMBURGER-
	//			active: <ONOFF>
	//		FILTER-
	//			active: <ONOFF>
	//			which: <WHICH FILTER>
	//		TRUCKCLICK
	//			<TRUCKID>
	//		REFRESH
	//		CHANGEGPS
	//			<ONOFF>
	//		PUSHTOSOCIAL
	//
	reporting.report=function(who,what,extra_info,callback){
		console.log("[Report] WHO:"+who+" WHAT:"+what);
		callback();
	}
	return reporting;

});