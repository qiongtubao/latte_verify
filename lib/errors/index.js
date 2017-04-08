(function() {
    
	var errors = {
		configError: require("./configException.js"),
		dataError: require("./dataException.js"),
		codeError: require("./codeException.js")
	};
	this.whatIsError = function(error) {
		for(var i in errors) {
			if(error.constructor ==  errors[i] ) {
				return errors[i];
			}
		}
		return false;
	}
    
	this.errors = errors;
}).call(module.exports);