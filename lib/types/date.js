"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = require("../errors/index");
var utils_1 = require("../utils");
var DateType;
(function (DateType) {
    var toDate = function (object) {
        var date = new Date(object);
        if (isNaN(date.getTime())) {
            return null;
        }
        return date;
    };
    function parse(object, config) {
        var date = toDate(object);
        if (!date) {
            throw new index_1.DataError("date data error", object);
        }
        return date;
    }
    DateType.parse = parse;
    function verify(object, config) {
        if (config.min) {
            utils_1.default.than(config.min, object, function (minDate, data) {
                if (!minDate) {
                    throw new index_1.ConfigError("date min config error", config);
                }
                if (data.getTime() < minDate.getTime()) {
                    throw new index_1.DataError("date min config error", data);
                }
            }, function (v) {
                return toDate(v);
            });
        }
        if (config.max) {
            utils_1.default.than(config.max, object, function (maxDate, data) {
                if (!maxDate) {
                    throw new index_1.ConfigError("date max config error", config);
                }
                if (data.getTime() > maxDate.getTime()) {
                    throw new index_1.DataError("date max config error", data);
                }
            }, function (v) {
                return toDate(v);
            });
        }
        return object;
    }
    DateType.verify = verify;
})(DateType || (DateType = {}));
exports.default = DateType;
