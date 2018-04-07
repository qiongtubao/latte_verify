(function() {
	var latte_lib = require("latte_lib") ;
    var whatIs = latte_lib.getClassName;
	this.objectThan = function(config, data, thanFunc, configParse) {
        if(config.value) {
            if(configParse) { config.value = configParse(config.value);}
            try {
                thanFunc(config.value, data);
            }catch(err){
                throw config.error || err;
            }
        }else{
            if(configParse) { config = configParse(config);};
            thanFunc(config, data);
        }
    }
	this.than = function(config, data, thanFunc, configParse) {
    	switch(whatIs(config)) {
    		case "object":
    			if(!config.value) {
    				throw new errors.configError("config attr is object but it has not value");
    			}
    			if(configParse) { config.value = configParse(config.value);}
    			try {
    				thanFunc(config.value, data);
    			}catch(err){
    				throw config.error || err;
    			}
    			
    		break;
    		default:
    			if(configParse) { config = configParse(config);};
    			thanFunc(config, data);
    		break;
    	}
    }
}).call(module.exports);