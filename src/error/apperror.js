class AppError extends Error {
    constructor(message, status, isPublic){
        super(message);
        this.status = status;
        this.isPublic = isPublic;
        this.message = message
        this.name = this.constructor.name
        Error.captureStackTrace(this, this.constructor)
    }
}
export {AppError}