

var Errors = require("../errors");
var errors = Errors.errors;
(function() {
	var toDate = function(object) {
		var date = new Date(object);
    	if(isNaN(date.getTime())) {
    		return null;
    	}
    	return date;
	}
    this.parse = function(object, config) {
    	var date = toDate(object);
    	if(!date) {
    		throw new errors.dataError("date data error", object);
    	}
        return date;
    }
    var than = require("../utils").than;
    this.verify = function(data, config) {
        if(config.min) {
        	than(config.min, data, function(minDate, data) {
    			if(!minDate) {
    				throw new errors.configError("date min config error", config);
    			}
    			if(data.getTime() < minDate.getTime()) {
    				throw new errors.dataError("date min config error", data);
    			}
        	}, function(v) {
        		return toDate(v);
        	});
        	
        }
        if(config.max) {
        	than(config.max, data, function(maxDate, data) {
    			if(!maxDate) {
    				throw new errors.configError("date max config error", config);
    			}
    			if(data.getTime() > maxDate.getTime()) {
    				throw new errors.dataError("date max config error", data);
    			}
        	}, function(v) {
        		return toDate(v);
        	});
        	
        }
        return data;
    }
}).call(module.exports);