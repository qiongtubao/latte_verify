"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var errors_1 = require("../errors");
var NUllType;
(function (NUllType) {
    function parse(object) {
        if (object != null && object != "null") {
            throw new errors_1.DataError("null parse error", object);
        }
        return undefined;
    }
    NUllType.parse = parse;
})(NUllType || (NUllType = {}));
exports.default = {
    parse: NUllType.parse,
    verify: NUllType.parse
};
