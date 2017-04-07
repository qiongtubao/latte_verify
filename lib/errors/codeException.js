function CodeException(error) {

    if (error.constructor == CodeException) {
        return error;
    } else if (error.constructor == Error) {
        error.constructor = CodeException;
        return error;
    } else{
        var error =  new Error(error);
        error.constructor = CodeException;
        return error;
    }
};
(function() {
    this.toString = function() {
        return this.id + " config Error";
    }
}).call(CodeException.prototype);
module.exports = CodeException;