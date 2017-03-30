/**
 * Created by dong on 16/12/9.
 */
  var whatIs = require("latte_lib").getClassName;
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
                throw new Error("string maxLength Error");
            }
        }
        if(config.minLength) {
            if(data.length < config.minLength) {
                throw new Error("string minLength Error");
            }
        }

        if(config.in) {
            if(config.in.indexOf(data) == -1) {
                throw new Error("string in Error");
            }
        }
        if(config.regex) {
            if(!config.regex.test(data)) {
                throw new Error("string regex Error");
            }
        }
        if(config.match) {
            if(!config.match(data)) {
                throw new Error("string match error");
            }
        }
        return data;
    }
}).call(module.exports);