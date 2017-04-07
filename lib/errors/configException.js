/**
 * Created by dong on 16/12/9.
 */
function ConfigException(error, config) {

    if (error.constructor == ConfigException) {
        error.config = config;
        return error;
    } else if (error.constructor == Error) {
        error.constructor = ConfigException;
        error.config = config;
        return error;
    } else{
        var error =  new Error(error);
        error.config = config;
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