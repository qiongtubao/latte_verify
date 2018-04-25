"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var latte_lib_1 = require("latte_lib");
var errors_1 = require("../errors");
var whatIs = latte_lib_1.default.getClassName;
var utils_1 = require("../utils");
var ObjectType;
(function (ObjectType) {
    function parse(object, config) {
        switch (whatIs(object)) {
            case "string":
                try {
                    return JSON.parse(object);
                }
                catch (err) {
                    throw new errors_1.DataError("object data error", object);
                }
            case "object":
                return object;
            default:
                throw new errors_1.DataError("object data error", object);
        }
    }
    ObjectType.parse = parse;
    function verify(object, config) {
        if (config.properties) {
            utils_1.default.objectThan(config.properties, object, function (v, data) {
                for (var key in v) {
                    var childConfig = v[key];
                    try {
                        var verify_1 = require("../index").default;
                        var o = verify_1.verify(data[key], childConfig, 1);
                        data[key] = o;
                    }
                    catch (error) {
                        throw error;
                    }
                }
            });
        }
        return object;
    }
    ObjectType.verify = verify;
})(ObjectType || (ObjectType = {}));
exports.default = ObjectType;
