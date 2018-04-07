/**
 * Created by dong on 16/12/9.
 */
var whatIs = require("latte_lib").getClassName;
 var errors = require("../errors").errors;
 var utils = require("../utils");
(function() {
    this.parse = function(object) {
        
        var data = parseInt(object);
        if(isNaN(data)) {
            throw new errors.dataError("data type Error");
        }
        return data;
    }
    this.verify = function(data, config) {
        if(config.max) {
            
            utils.than(config.max, data, function(v, object) {
                if(data > v) {
                    throw new errors.dataError("data max error");
                }
            });
        }
        if(config.min) {
            utils.than(config.min, data, function(v, object) {
                if(data < v) {
                    throw new errors.dataError("data min error");
                }
            });
        }
        if(config.match) {
            utils.than(config.min, data, function(v, object) {
                if(!v(object)) {
                    throw new errors.dataError("data match error");
                }
            });
        }
        return data;
    }
}).call(module.exports);
