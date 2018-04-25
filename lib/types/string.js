"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var latte_lib_1 = require("latte_lib");
var whatIs = latte_lib_1.default.getClassName;
var errors_1 = require("../errors");
var utils_1 = require("../utils");
var StringType;
(function (StringType) {
    function parse(object) {
        switch (whatIs(object)) {
            case "object":
                return JSON.stringify(object);
            case "string":
                return object;
            default:
                return object.toString();
        }
    }
    StringType.parse = parse;
    function verify(data, config) {
        if (config.maxLength) {
            utils_1.default.than(config.maxLength, data, function (v, data) {
                if (data.length > v) {
                    throw new errors_1.DataError("string maxLength Error", data);
                }
            });
        }
        if (config.minLength) {
            utils_1.default.than(config.minLength, data, function (v, data) {
                if (data.length < v) {
                    throw new errors_1.DataError("string minLength Error", data);
                }
            });
        }
        if (config.in) {
            utils_1.default.than(config.in, data, function (v, data) {
                if (v.indexOf(data) == -1) {
                    throw new errors_1.DataError("string in Error", data);
                }
            });
        }
        if (config.regex) {
            utils_1.default.than(config.regex, data, function (v, data) {
                var regex = new RegExp(v, "img");
                if (!regex.exec(data)) {
                    throw new errors_1.DataError("string regex Error", data);
                }
            });
        }
        if (config.match) {
            utils_1.default.than(config.match, data, function (v, data) {
                if (!v(data)) {
                    throw new errors_1.DataError("string match error", data);
                }
            });
        }
        return data;
    }
    StringType.verify = verify;
})(StringType || (StringType = {}));
exports.default = StringType;
