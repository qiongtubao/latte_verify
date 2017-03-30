/**
 * Created by dong on 16/12/9.
 */
function DataException( error, id) {

    if (error.constructor == DataException) {
        error.id = id;
        return error;
    } else if (error.constructor == Error) {
        error.id = id;
        error.constructor = DataException;
        return error;
    } else{
        
        var error =  new Error(error);
        error.id = id;
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