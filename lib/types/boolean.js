"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var errors_1 = require("../errors");
var utils_1 = require("../utils");
var BooleanType;
(function (BooleanType) {
    function parse(data) {
        if (data == true || data == "true") {
            return true;
        }
        if (data == false || data == "false") {
            return false;
        }
        throw new errors_1.DataError("boolean parse error");
    }
    BooleanType.parse = parse;
    function verify(data, config) {
        if (config.equal) {
            utils_1.default.than(config.equal, data, function (v, data) {
                if (v != data) {
                    throw new errors_1.DataError("boolean equal error", data);
                }
            });
        }
    }
    BooleanType.verify = verify;
})(BooleanType || (BooleanType = {}));
exports.default = BooleanType;
