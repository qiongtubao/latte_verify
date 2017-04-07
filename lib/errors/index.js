(function() {
	var errors = {
		configError: require("./configException.js"),
		dataError: require("./dataException.js"),
		codeError: require("./codeException.js")
	};
	this.isMyError = function(error) {
		for(var i in errors) {
			if(error instanceof errors[i] ) {
				return true;
			}
		}
		return false;
	}
	this.errors = errors;
}).call(module.exports);