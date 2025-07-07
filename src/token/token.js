import { JWT_SECRET } from "../config/enviromental";
import { ApiError } from "../error/apierror";
import { logMessages } from "../utils/constant";
import httpStatus from 'http-status'
import jwt from 'jsonwebtoken'
const authMiddleware = (req,res,next) => {
   try {
    const token = req.headers?.authorization?.split(" ")[1];
    if(!token) throw new ApiError(logMessages.unAuthorized, httpStatus.UNAUTHORIZED)
    jwt.verify(token, JWT_SECRET, (err,data) => {
        if(err) throw new ApiError(logMessages.sessionExpired, httpStatus.UNAUTHORIZED)
        req.user = data
        next()
    })
   } catch (error) {
    next(error)
   }
}
const isUser = (req,res,next) => {
    try {
        authMiddleware(req,res, () => {
            if(req.user?.role !== 'user') throw new ApiError(logMessages.mustBeUser, httpStatus.UNAUTHORIZED)
            next()
        })
    } catch (error) {
        
    }
}
const isAdmin = (req,res,next) => {
    try {
        authMiddleware(req,res, () => {
            console.log(req.user?.role)
            if(req.user?.role !== 'admin') throw new ApiError(logMessages.unAuthorized, httpStatus.UNAUTHORIZED)
            next()
        })
    } catch (error) {
        next(error)
    }
}
export {authMiddleware, isAdmin, isUser}