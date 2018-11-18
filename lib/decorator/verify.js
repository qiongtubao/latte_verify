"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var verify_1 = require("../verify");
function Verify(obj) {
    return function (target, propertyKey, descriptor) {
        Object.defineProperty(target, propertyKey, {
            get: function () {
                return target["_" + propertyKey];
            },
            set: function (value) {
                var v = verify_1.default(value, obj);
                target["_" + propertyKey] = v;
            }
        });
    };
}
exports.default = Verify;
