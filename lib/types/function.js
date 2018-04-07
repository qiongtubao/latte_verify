/**
 * Created by dong on 16/12/9.
 */
var whatIs = require("latte_lib").getClassName;
var Errors = require("../errors");
var errors = Errors.errors;
(function() {
    this.verify = this.parse = function(data) {
        if(whatIs(data) != "function") {
            throw new errors.dataError("data type error")
        }
        return data;
    }

}).call(module.exports);