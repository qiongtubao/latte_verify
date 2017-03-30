/**
 * Created by dong on 16/12/9.
 */
var whatIs = require("latte_lib").getClassName;
(function() {
    this.parse = function(object) {
        
        var data = parseInt(object);
        if(isNaN(data)) {
            throw new Error("data type Error");
        }
        return data;
    }
    this.verify = function(data, config) {
        if(config.max) {
            switch(whatIs(config.max)) {
                case "int":
                    if(data > config.max) {
                        throw new Error("data max error");
                    }
                break;
                case "object":
                    if(data > config.max.value) {
                        throw config.max.error || new Error("data max error");
                    }
                break;
            }
        }
        if(config.min) {
            switch(whatIs(config.max)) {
                case "int":
                    if(data < config.min) {
                        throw new Error("data min error");
                    }
                break;
                case "object":
                    if(data < config.min.value) {
                        throw config.min.error || new Error("data min error");
                    }
                break;
            }
        }
        if(config.match) {
            switch(whatIs(config.match)) {
                case "function":
                    if(!config.match(data)) {
                        throw new Error("data match error");
                    }
                break;
                case "object":
                    if(!config.match.value(data)) {
                        throw config.match.error || new Error("data match error");
                    }
                break;
            }
        }
        return data;
    }
}).call(module.exports);
