/**
 * Created by dong on 16/12/9.
 */
function DataException( error, data, config) {

    if (error.constructor == DataException) {
        error.data = data;
        error.config = config;
        return error;
    } else if (error.constructor == Error) {
        error.data = data;
        error.config = config;
        error.constructor = DataException;
        return error;
    } else{
        var error =  new Error(error);
        error.data = data;
        error.config = config;
        error.constructor = DataException;
        return error;
    }
};
(function() {
    this.toString = function() {
        return this.id + " data Error";
    }
}).call(DataException.prototype);
module.exports = DataException;