/**
 * Created by dong on 16/12/9.
 */
  var whatIs = require("latte_lib").getClassName;

(function() {
    this.parse = function(object, config) {
        switch(whatIs(object)) {
            case "string":
                return JSON.parse(object);
            break;
            case "object":
                return object;
            break;
            default:
                throw new Error("type error");
            break;
        }
    }
    this.verify = function(object, config) {
        if(config.properties) {
            if(config.properties.value) {
                for(var key in config.properties.value) {
                    var childConfig = config.properties.value[key];
                    try {
                        var verify = require("../verify");
                        var data = verify.verify(object[key], childConfig, 1);
                        object[key] = data;
                    }catch(error) {
                        if(childConfig.error) {
                            throw childConfig.error;
                        }else{
                            throw  Error(childConfig.id,  error);
                        }

                    }
                }    
            }else{
                for(var key in config.properties) {
                    var childConfig = config.properties[key];
                    try {
                        var verify = require("../verify");
                        var data = verify.verify(object[key], childConfig, 1);
                        object[key] = data;
                    }catch(error) {
                        if(childConfig.error) {
                            throw childConfig.error;
                        }else{
                            throw  Error(childConfig.id,  error);
                        }

                    }
                }
            }
        }
        
        return object;
    }
}).call(module.exports);