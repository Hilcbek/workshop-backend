import { validationResult } from "express-validator";
import httpStatus from 'http-status'
import { ApiError } from "../error/apierror";
const parseValidation = (req,res,next) => {
    try {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            const errorsMessage = errors.array().map((err) => ' '+err.msg)
            throw new ApiError(errorsMessage, httpStatus.BAD_REQUEST)
        }
        next()
    } catch (error) {
        next(error)
    }
}
export {parseValidation}