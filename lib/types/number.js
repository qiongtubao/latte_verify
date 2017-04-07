var Errors = require("../errors");
var errors = Errors.errors;
(function() {
	this.parse= function(data) {
		data = data - 0;
		if(isNaN(data)) {
			throw new errors.dataError("number parse error");
		}
		return data;
	}
	this.verify= function(data, config) {
		
	}
}).call(module.exports);