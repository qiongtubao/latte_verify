/**
 * Created by dong on 16/12/9.
 */
 var whatIs = require("latte_lib").getClassName;
(function() {
    this.parse = function(object) {
        switch(whatIs(object)) {
            case "array":
                return object;
            break;
            case "string":
            return JSON.parse(object);
            default:
            throw new Error("array parse error");
        }
    }
    this.verify = function(data, config) {
        if(config.maxLength) {
            switch(whatIs(config.maxLength)) {
                case "int":
                case "number":
                    if(data.length > config.maxLength) {
                        throw new Error("array maxLength error");
                    }
                break;
                case "object":
                    if(data.length > config.maxLength.value) {
                        throw config.maxLength.error || new Error("array maxLength error")
                    }
                break;
                default :
                console.log("/////",whatIs(config.minLength));
                 throw new Error("config array maxLength error")
            }
            
        }
        if(config.minLength) {
            switch(whatIs(config.minLength)) {
                case "int":
                case "number":
                    if(data.length <  config.minLength) {
                        throw new Error("array minLength error");
                    }
                break;
                case "object":
                    if(data.length < config.minLength.value) {
                        throw config.minLength.error || new Error("array minLength error");
                    }
                break;
                default:

                    throw new Error("config array minLength error");
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
                            throw  DataException(childConfig.id,  error);
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
                            throw  DataException(childConfig.id,  error);
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
                            throw new Error("array all error");
                        }
                    }
                break;
                case "object":
                    if(!config.all.value) {
                        throw new Error("config error");
                    }
                    for(var i = 0, len = data.length ; i< len; i++) {
                        var index = config.all.value.indexOf(data[i]);
                        if(index == -1) {
                            throw config.all.error;
                        }
                    }
                break;
                default:
                    throw new Error("config error");
                break;
            }
            
        }
        return data;
    }
}).call(module.exports);