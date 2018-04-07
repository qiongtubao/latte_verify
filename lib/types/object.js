/**
 * Created by dong on 16/12/9.
 */
var whatIs = require("latte_lib").getClassName;
var Errors = require("../errors");
var errors = Errors.errors;
var utils = require("../utils");
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
                throw new errors.dataError("type error");
            break;
        }
    }
    this.verify = function(data, config) {
        if(config.properties) {
            utils.objectThan(config.properties, data, function(v, object) {
                for(var key in v) {
                    var childConfig = v[key];
                    try {
                        var verify = require("../verify");
                        var data = verify.verify(object[key], childConfig, 1);
                        object[key] = data;
                    }catch(error) {
                        throw error;
                    }
                }   
            })
        }
        /**
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
                            throw  new errors.CodeError(childConfig.id,  error);
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
                            throw  errors.dataError( error);
                        }

                    }
                }
            }
        }
        */
        return data;
    }
}).call(module.exports);