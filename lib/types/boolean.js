(function() {
	var Errors = require("../errors");
	var errors = Errors.errors;
	var utils = require("../utils");
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
		if(config.equal) {
			utils.than(config.equal, data, function(v, data){
				if(v != data) {
					throw new errors.dataError("boolean equal error", data);
				}
			});
		}
 	}
}).call(module.exports);