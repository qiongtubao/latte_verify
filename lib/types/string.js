/**
 * Created by dong on 16/12/9.
 */
var whatIs = require("latte_lib").getClassName;
var Errors = require("../errors");
var errors = Errors.errors;
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
            if(data.length > config.maxLength) {
                throw new errors.dataError("string maxLength Error");
            }
        }
        if(config.minLength) {
            if(data.length < config.minLength) {
                throw new errors.dataError("string minLength Error");
            }
        }

        if(config.in) {
            if(config.in.indexOf(data) == -1) {
                throw new errors.dataError("string in Error");
            }
        }
        if(config.regex) {
            var regex = new RegExp(config.regex, "img");
            if(!regex.exec(data)) {
                throw new errors.dataError("string regex Error");
            }
        }
        if(config.match) {
            if(!config.match(data)) {
                throw new errors.dataError("string match error");
            }
        }
        return data;
    }
}).call(module.exports);