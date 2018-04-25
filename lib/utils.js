"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var latte_lib_1 = require("latte_lib");
var index_1 = require("./errors/index");
var whatIs = latte_lib_1.default.getClassName;
function objectThan(config, data, thanFunc, configParse) {
    if (config.value) {
        if (configParse) {
            config.value = configParse(config.value);
        }
        try {
            thanFunc(config.value, data);
        }
        catch (err) {
            throw config.error || err;
        }
    }
    else {
        if (configParse) {
            config = configParse(config);
        }
        ;
        thanFunc(config, data);
    }
}
function than(config, data, thanFunc, configParse) {
    switch (whatIs(config)) {
        case "object":
            if (!config.value) {
                throw new index_1.ConfigError("config attr is object but it has not value");
            }
            if (configParse) {
                config.value = configParse(config.value);
            }
            try {
                thanFunc(config.value, data);
            }
            catch (err) {
                throw config.error || err;
            }
            break;
        default:
            if (configParse) {
                config = configParse(config);
            }
            ;
            thanFunc(config, data);
            break;
    }
}
exports.default = {
    than: than,
    objectThan: objectThan
};
