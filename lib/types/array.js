/**
 * Created by dong on 16/12/9.
 */
var latte_lib = require("latte_lib") ;
var whatIs = latte_lib.getClassName;
var Errors = require("../errors");
var errors = Errors.errors;
(function() {
    this.parse = function(object, config) {
        switch(whatIs(object)) {
            case "array":
                return object;
            break;
            case "string":
                try {
                    var a =  JSON.parse(object);
                }catch(err) {
                    a = object;
                }
                 if(!latte_lib.isArray(a)) {
                    if(config.force) {
                        return [a];
                    } else{
                        throw new errors.dataError("array parse error"); 
                    }
                }else{
                    return a;
                }

            default:
                if(config.force) {
                     return [object];
                     //throw new Error("array parse error");
                }
           
        }
    }
    this.verify = function(data, config) {
        if(config.maxLength) {
            switch(whatIs(config.maxLength)) {
                case "int":
                case "number":
                    if(data.length > config.maxLength) {
                        throw new errors.dataError("array maxLength error");
                    }
                break;
                case "object":
                    if(data.length > config.maxLength.value) {
                        throw config.maxLength.error || new errors.dataError("array maxLength error")
                    }
                break;
                default :
                 throw new errors.dataError("config array maxLength error")
            }
            
        }
        if(config.minLength) {
            switch(whatIs(config.minLength)) {
                case "int":
                case "number":
                    if(data.length <  config.minLength) {
                        throw new errors.dataError("array minLength error");
                    }
                break;
                case "object":
                    if(data.length < config.minLength.value) {
                        throw config.minLength.error || new errors.dataError("array minLength error");
                    }
                break;
                default:

                    throw new errors.dataError("config array minLength error");
            }
            
        }
        if(config.properties) {
            if(config.properties.value){
                for(var key in config.properties.value) {
                    var childConfig = config.properties.value[key];
                    try {
                        var data = verify(object[key], childConfig, 1);
                        object[key] = data;
                    }catch(error) {
                        if(config.properties.error) {
                            throw config.properties.error;
                        }
                        if(childConfig.error) {
                            throw childConfig.error;
                        }else{
                            throw  new errors.dataError(childConfig.id,  error);
                        }
                    }
                }
            }else{
                for(var key in config.properties) {
                    var childConfig = config.properties[key];
                    try {
                        var data = verify(object[key], childConfig, 1);
                        object[key] = data;
                    }catch(error) {
                        if(childConfig.error) {
                            throw childConfig.error;
                        }else{
                            throw  new errors.dataError(childConfig.id,  error);
                        }

                    }
                }
                
            }
            
        }
        if(config.all) {
            switch(whatIs(config.all)) {
                case "array":
                    for(var i = 0 , len = data.length; i < len; i++) {
                        var index = config.all.indexOf(data[i]);
                        if(index == -1) {
                            throw new errors.dataError("array all error");
                        }
                    }
                break;
                case "object":
                    if(!config.all.value) {
                        throw new errors.dataError("config error");
                    }
                    for(var i = 0, len = data.length ; i< len; i++) {
                        var index = config.all.value.indexOf(data[i]);
                        if(index == -1) {
                            throw config.all.error;
                        }
                    }
                break;
                default:
                    throw new errors.dataError("config error");
                break;
            }
            
        }
        return data;
    }
}).call(module.exports);