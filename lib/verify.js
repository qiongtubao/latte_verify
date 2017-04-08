/**
 * Created by dong on 16/12/9.
 */
 var latte_lib = require("latte_lib");
var whatIs = latte_lib.getClassName;
var handles = {
    "string": require("./types/string"),
    "boolean": require("./types/boolean"),
    "integer": require("./types/integer"),
    "null": require("./types/null"),
    "number": require("./types/number"),
    "object": require("./types/object"),
    "array": require("./types/array"),
    "date": require("./types/date")
};
var Errors = require("./errors");
var errors = require("./errors").errors;
var Verify = function(options) {
    this.handles = {};
    var self = this;
    for(var i in handles) {
        self.handles[i] = handles[i];
    }
};
(function() {
    this.inHandle = function(type) {
        return !!this.handles[type];
    };
    var objectConfig = {
        properties: {
            value: {
                all: ["string","array", "object"],
            }
        }
    };
   
    this.verify = function(data, config) {
        var self = this;
        if(data == null ) {
            if(config.default != null) {
                return config.default;
            }
            if(config.must == true) {
                //throw new Error("config must value")
                console.log(config, data);
                throw  config.error || new errors.dataError("config must value")
            }else if(latte_lib.isObject(config.must) && config.must.value == true) {
                throw config.must.error || config.error || new errors.dataError("config must value");
            }   
            return data;
        }
        /**
        try {
            config = self.verify(config, vConfig);
        }catch(error) {
            //error
            throw new ConfigException(error);
        }
        */
        
        if(!config.type) {
            throw new errors.configError("config root not type");
        }
        var handle;
        switch(whatIs(config.type)) {
            case "object":
                if(!config.type.value) {
                    throw config.type.error || new errors.configError("config type ")
                }
                handle = self.handles[config.type.value];

            break;
            case "string":
               
                handle = self.handles[config.type];

            break;
            default: 
                
                throw config.type.error || config.error || new errors.configError("config root type error");
        }
        
        
        if(!handle) {
            throw new errors.configError("verify not have type ", config);
        }
        try {
           
            data = handle.parse(data, config);
            data = handle.verify(data, config);
            
        }catch(error) {
            if(Errors.whatIsError(error) == errors.dataError) {
                throw config.error || error;
            }else{

                throw error;
            }
            
        }
        return data;
    }
    this.addHandle = function(type, handle) {
        this.handles[type] = handle;
    }
}).call(Verify.prototype);
var defaultVerify = new Verify();
(function() {
   
}).call(defaultVerify);

module.exports = defaultVerify;

