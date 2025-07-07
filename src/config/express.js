import express from 'express'
import morgan from 'morgan'
import { logger } from './winston';
import { ApiError } from '../error/apierror';
import { router } from './router';
import cors from 'cors'
import { rateLimiter } from './rateLimit';
const app = express()

app.use(express.json())
app.use(morgan('combined', {
    stream : {
        write : (message) => logger.info(message)
    }
}))
app.use(cors({
    origin : 'http://localhost:5173',
    credentials : true
}))
app.use(async (req, res, next) => {
    try {
      await rateLimiter.consume(req.ip); 
      next();
    } catch (rejRes) {
      res.status(429).json({
        message: 'Too many requests, please try again later.',
      });
    }
  });
app.use('/api', router)

app.use((err,req,res,next) => {
    console.log(err)
    if(err instanceof ApiError){
        if(err.isPublic){
            const message = err.message || 'Something went wrong'
            res.status(err.status).json({error : message})
        }else{
            res.status(err.status).json({ error : 'Something went wrong'})
        }
    }else{
        logger.error(err)
        res.status(500).json({error : err.message})
    }
    next()
})

export {app}