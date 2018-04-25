"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var latte_lib_1 = require("latte_lib");
var whatIs = latte_lib_1.default.getClassName;
var errors_1 = require("../errors");
var utils_1 = require("../utils");
var ArrayType;
(function (ArrayType) {
    function parse(object, config) {
        switch (whatIs(object)) {
            case "array":
                return object;
            case "string":
                var parseData = void 0;
                try {
                    parseData = JSON.parse(object);
                }
                catch (err) {
                    parseData = object;
                }
                if (!latte_lib_1.default.isArray(parseData)) {
                    if (config.force) {
                        return [parseData];
                    }
                    else {
                        throw new errors_1.DataError("array parse error", object);
                    }
                }
                else {
                    return parseData;
                }
            default:
                if (config.force) {
                    return [object];
                }
                else {
                    throw new errors_1.DataError("array parse error", object);
                }
        }
    }
    ArrayType.parse = parse;
    function verify(data, config) {
        if (config.maxLength) {
            utils_1.default.than(config.maxLength, data, function (v, data) {
                if (data.length > v) {
                    throw new errors_1.DataError("array maxLength error", data);
                }
            });
        }
        if (config.minLength) {
            utils_1.default.than(config.minLength, data, function (v, data) {
                if (data.length < v) {
                    throw new errors_1.DataError("array minLength error", data);
                }
            });
        }
        if (config.properties) {
            utils_1.default.objectThan(config.properties, data, function (v, object) {
                for (var key in v) {
                    var childConfig = v[key];
                    try {
                        var data_1 = require("../index").default.verify(object[key], childConfig, 1);
                        object[key] = data_1;
                    }
                    catch (error) {
                        throw childConfig.error || error;
                    }
                }
            });
        }
        if (config.all) {
            utils_1.default.than(config.all, data, function (v, object) {
                for (var i = 0, len = object.length; i < len; i++) {
                    var index = v.indexOf(object[i]);
                    if (index == -1) {
                        throw new errors_1.DataError("array all error", data, config);
                    }
                }
            });
        }
        if (config.match) {
            utils_1.default.than(config.match, data, function (v, object) {
                for (var i = 0, len = object.length; i < len; i++) {
                    var result = v(object[i]);
                    if (!result) {
                        throw new errors_1.DataError("array match error", data);
                    }
                }
            });
        }
        return data;
    }
    ArrayType.verify = verify;
})(ArrayType || (ArrayType = {}));
exports.default = ArrayType;
