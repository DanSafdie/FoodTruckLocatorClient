// TODO: USE THIS INSTEAD OF URL TO MOVE USER INFO
define(["jquery","nomadic_storage"],function($,NS){
	var userInfo = userInfo || {};
	userInfo.getUserID=function(){
		return NS.getItem("user-info",false);
	}
	userInfo.setUserID=function(val){
		NS.setItem("user-info",val,false);
	}
	return userInfo;
});