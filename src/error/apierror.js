import { AppError } from "./apperror";
import httpStatus from 'http-status'
class ApiError extends AppError {
    constructor(message, status = httpStatus.INTERNAL_SERVER_ERROR, isPublic = true){
        super(message, status, isPublic);
        this.message = message;
        this.status = status;
        this.isPublic = isPublic;
    }
}
export {ApiError}