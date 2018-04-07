var Errors = require("../errors");
var errors = Errors.errors;
(function() {
	this.parse=function(data) {
		
		if(data != null && data != "null") {
			throw new errors.dataError("null parse ")
		}
	}
	this.verify =function(data , config) {

	}
}).call(module.exports);