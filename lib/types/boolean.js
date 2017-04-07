(function() {
	var Errors = require("../errors");
	var errors = Errors.errors;
	this.parse = function(data) {
		if(data == true || data == "true") {
			return true;
		}
		if(data == false || data == "false") {
			return false;
		}
		throw new errors.dataError("boolean parse error");
	}
	this.verify = function(data, config) {
		
	}
}).call(module.exports);