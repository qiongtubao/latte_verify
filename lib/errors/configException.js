/**
 * Created by dong on 16/12/9.
 */
function ConfigException(error, id) {

    if (error.constructor == ConfigException) {
        error.id = id;
        return error;
    } else if (error.constructor == Error) {
        error.constructor = ConfigException;
        error.id = id;
        return error;
    } else{
        console.log("????",error);
        var error =  new Error(error);
        error.id = id;
        error.constructor = ConfigException;
        return error;
    }
};
(function() {
    this.toString = function() {
        return this.id + " config Error";
    }
}).call(ConfigException.prototype);
module.exports = ConfigException;