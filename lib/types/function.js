/**
 * Created by dong on 16/12/9.
 */
 var whatIs = require("latte_lib").getClassName;
(function() {
    this.verify = this.parse = function(data) {
        if(whatIs(data) != "function") {
            throw new Error("data type error")
        }
        return data;
    }

}).call(module.exports);