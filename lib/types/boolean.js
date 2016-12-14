(function() {
	this.parse = function(data) {
		if(data == true || data == "true") {
			return true;
		}
		if(data == false || data == "false") {
			return false;
		}
		throw new Error("boolean parse error");
	}
	this.verify = function(data, config) {
		
	}
}).call(module.exports);