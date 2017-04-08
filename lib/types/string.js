/**
 * Created by dong on 16/12/9.
 */
var latte_lib = require("latte_lib");
var whatIs = latte_lib.getClassName;
var Errors = require("../errors");
var errors = Errors.errors;
var utils = require("../utils");
(function() {
    this.parse = function(object) {
        switch(whatIs(object)) {
            case "object":
                return JSON.stringify(object);
            case "string":
                return object;
            default:
                return object.toString();
        }
    }
    this.verify = function(data, config) {
        if(config.maxLength) {
            utils.than(config.maxLength, data, function(v, data) {
                if(data.length > v) {
                    throw new errors.dataError("string maxLength Error", data);
                }
            });
            
            
        }
        if(config.minLength) {
            utils.than(config.minLength, data, function(v, data){
                if(data.length < v) {
                    throw new errors.dataError("string minLength Error", data);
                }
            }) 
            
        }

        if(config.in) {
            utils.than(config.in, data, function(v, data) {
                if(v.indexOf(data) == -1) {
                    throw new errors.dataError("string in Error", data);
                }
            });
            
        }
        if(config.regex) {
            utils.than(config.regex, data, function(v, data) {
                var regex = new RegExp(v, "img");
                if(!regex.exec(data)) {
                    throw new errors.dataError("string regex Error", data);
                }
            });
           
        }
        if(config.match) {
            utils.than(config.match, data, function(v, data) {
                if(!v(data)) {
                    throw new errors.dataError("string match error", data);
                }
            });
            
        }
        return data;
    }
}).call(module.exports);