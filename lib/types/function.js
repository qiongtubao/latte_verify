"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = require("../errors/index");
var latte_lib_1 = require("latte_lib");
var whatIs = latte_lib_1.default.getClassName;
var FunctionType;
(function (FunctionType) {
    function parse(object, config) {
        if (whatIs(object) !== "function") {
            throw new index_1.DataError("data type error");
        }
        return object;
    }
    FunctionType.parse = parse;
})(FunctionType || (FunctionType = {}));
exports.default = {
    verify: FunctionType.parse,
    parse: FunctionType.parse
};
