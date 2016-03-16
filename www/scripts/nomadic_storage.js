define(["jquery"],function($){
	var nomadicStorage = nomadicStorage || {};
	nomadicStorage.getItem=function(str,expand){
		var thing=localStorage.getItem(str);
		// console.log("getting:"+str+" got "+thing);
		if (expand){
			thing=JSON.parse(thing);
		}
		return thing;
	}
	nomadicStorage.setItem=function(str,val,contract){
		var lcl_val=val;
		if (contract){
			lcl_val=JSON.stringify(lcl_val);
		}
		// console.log("setting:"+str+" set "+lcl_val);

		localStorage.setItem(str,lcl_val);
	}
	return nomadicStorage;

});