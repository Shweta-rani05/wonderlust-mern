class ExpressError extends Error {
    constructor(statusCode , message){
        super();
        this.statusCode = statusCode;
        this.messaage = message;
    }
}

module.exports = ExpressError;