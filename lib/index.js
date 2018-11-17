"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var latte_lib_1 = require("latte_lib");
var whatIs = latte_lib_1.default.getClassName;
var string_1 = require("./types/string");
var boolean_1 = require("./types/boolean");
var date_1 = require("./types/date");
var function_1 = require("./types/function");
var integer_1 = require("./types/integer");
var null_1 = require("./types/null");
var number_1 = require("./types/number");
var object_1 = require("./types/object");
var array_1 = require("./types/array");
var index_1 = require("./errors/index");
var handles = {
    "string": string_1.default,
    "boolean": boolean_1.default,
    "date": date_1.default,
    "function": function_1.default,
    "integer": integer_1.default,
    "null": null_1.default,
    "number": number_1.default,
    "object": object_1.default,
    "array": array_1.default
};
var verify = function (data, config) {
    if (data == null) {
        if (config.default != null) {
            return config.default;
        }
        if (config.must == true) {
            throw config.error || new index_1.DataError("config must value");
        }
        else if (latte_lib_1.default.isObject(config.must) && config.must.value == true) {
            throw config.must.error || config.error || new index_1.DataError("config must value");
        }
        return data;
    }
    if (!config.type) {
        throw new index_1.ConfigError("config root not type");
    }
    var handle;
    switch (whatIs(config.type)) {
        case "object":
            if (!config.type.value) {
                throw config.type.error || new index_1.ConfigError("config type ");
            }
            handle = handles[config.type.value];
            break;
        case "string":
            handle = handles[config.type];
            break;
        default:
            throw config.type.error || config.error || new index_1.ConfigError("config root type error");
    }
    if (!handle) {
        throw new index_1.ConfigError("verify not have type ", config);
    }
    try {
        data = handle.parse(data, config);
        data = handle.verify(data, config);
    }
    catch (error) {
        if (error.constructor == index_1.DataError) {
            throw config.error || error;
        }
        else {
            throw error;
        }
    }
    return data;
};
exports.default = {
    verify: verify,
};
var createVerifyClass = function (option) {
    return (function () {
        function class_1() {
        }
        class_1.verify = function (data) {
            return verify(data, option);
        };
        return class_1;
    }());
};
exports.createVerifyClass = createVerifyClass;
