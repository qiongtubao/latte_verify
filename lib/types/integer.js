"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var errors_1 = require("../errors");
var utils_1 = require("../utils");
var IntegerType;
(function (IntegerType) {
    function parse(object, config) {
        var data = parseInt(object);
        if (isNaN(data)) {
            throw new errors_1.DataError("data type Error", object);
        }
        return data;
    }
    IntegerType.parse = parse;
    function verify(object, config) {
        if (config.max) {
            utils_1.default.than(config.max, object, function (v, data) {
                if (data > v) {
                    throw new errors_1.DataError("data max error", object);
                }
            });
        }
        if (config.min) {
            utils_1.default.than(config.min, object, function (v, data) {
                if (data < v) {
                    throw new errors_1.DataError("data min error", object);
                }
            });
        }
        if (config.match) {
            utils_1.default.than(config.match, object, function (v, data) {
                if (!v(data)) {
                    throw new errors_1.DataError("data match error");
                }
            });
        }
        return object;
    }
    IntegerType.verify = verify;
})(IntegerType || (IntegerType = {}));
exports.default = IntegerType;
