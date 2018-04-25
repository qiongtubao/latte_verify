"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var errors_1 = require("../errors");
var NumberType;
(function (NumberType) {
    function parse(object) {
        object = object - 0;
        if (isNaN(object)) {
            throw new errors_1.DataError("number parse error", object);
        }
        return object;
    }
    NumberType.parse = parse;
})(NumberType || (NumberType = {}));
exports.default = {
    parse: NumberType.parse,
    verify: NumberType.parse
};
