/**
 * Created by dong on 16/12/9.
 */
var latte_lib = require("latte_lib") ;
var whatIs = latte_lib.getClassName;
var Errors = require("../errors");
var utils = require("../utils");
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
                        throw new errors.dataError("array parse error", data); 
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
            
            utils.than(config.maxLength, data, function(v, data) {
                if(data.length > v) {
                    throw new errors.dataError("array maxLength error", data);
                }
            });
                
            
            
        }
        if(config.minLength) {
            utils.than(config.minLength, data, function(v, data) {
                if(data.length < v) {
                    throw new errors.dataError("array minLength error", data);
                }
            });
            
            
        }
        if(config.properties) {
            utils.objectThan(config.properties, data, function(v, object) {
                
                for(var key in v) {
                    var childConfig = v[key];
                    try {   
                        var data = require("../verify").verify(object[key], childConfig, 1);
                        object[key] = data;
                    }catch(error) {
                        throw  childConfig.error || error;
                    }
                }
            });
            
            
        }
        if(config.all) {
            utils.than(config.all, data, function(v, object) {
                for(var i = 0 , len = object.length; i < len; i++) {
                    var index = v.indexOf(object[i]);
                    if(index == -1) {
                        throw new errors.dataError("array all error", data, config);
                    }
                }
            });
        }
        if(config.match) {
            utils.than(config.match, data, function(v, object) {
                for(var i = 0 , len = object.length; i < len; i++) {
                    var result = v(object[i]);
                    if(!result) {
                        throw new errors.dataError("array match error", data);
                    }
                }
            });
        }
        return data;
    }
}).call(module.exports);