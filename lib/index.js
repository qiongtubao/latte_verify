"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var verify_1 = require("./verify");
var verify_2 = require("./decorator/verify");
exports.VerifyDecorator = verify_2.default;
exports.default = {
    verify: verify_1.default,
};
var createVerifyClass = function (option) {
    return (function () {
        function class_1() {
        }
        class_1.verify = function (data) {
            return verify_1.default(data, option);
        };
        return class_1;
    }());
};
exports.createVerifyClass = createVerifyClass;
