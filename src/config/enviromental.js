import joi from 'joi'
import dotenv from 'dotenv'
import { ApiError } from '../error/apierror';
import httpStatus from 'http-status'
import { logger } from './winston';
import path from 'path'
const envPath = `.env${process.env.NODE_ENV === 'production' ? '.production' : ''}`;
dotenv.config({ path: path.resolve(process.cwd(), envPath) });
const envSchema = joi.object({
    PORT : joi.number().default(3000),
    DATABASE_URL : joi.string().required(),
    NODE_ENV : joi.string().valid('development', 'production', 'test').required(),
    JWT_SECRET : joi.string().required(),
    REDIS_HOST : joi.string().required(),
    REDIS_PASSWORD : joi.string().required(),
    REDIS_USERNAME : joi.string().required(),
    REDIS_PORT : joi.number().required(),
    APP_PASSWORD : joi.string().required(),
    USER_EMAIL : joi.string().required()
}).unknown()

const {error, value, warning} = envSchema.validate(process.env)

if(error){
    throw new ApiError(`Config validation error: ${error.message}`, httpStatus.BAD_REQUEST, true)
}
if(warning){
    logger.warn(`Config validation warning: ${warning.message}`)
}
const PORT = value.PORT || 5000
const DATABASE_URL =value.DATABASE_URL
const JWT_SECRET =value.JWT_SECRET
const REDIS_HOST = value.REDIS_HOST
const REDIS_PASSWORD = value.REDIS_PASSWORD
const REDIS_USERNAME = value.REDIS_USERNAME
const REDIS_PORT = value.REDIS_PORT
const APP_PASSWORD = value.APP_PASSWORD
const USER_EMAIL = value.USER_EMAIL

export {PORT, DATABASE_URL,JWT_SECRET, REDIS_HOST, REDIS_PASSWORD, REDIS_USERNAME, REDIS_PORT, APP_PASSWORD, USER_EMAIL}