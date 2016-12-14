(function() {
	this.parse= function(data) {
		data = data - 0;
		if(isNaN(data)) {
			throw new Error("number parse error");
		}
		return data;
	}
	this.verify= function(data, config) {
		
	}
}).call(module.exports);