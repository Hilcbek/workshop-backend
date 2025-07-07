import express from 'express'
import { catchAsync } from '../config/catchAsync';
import { createUserController, getLoggedInUser, loginUserController } from '../controllers/user.controller';
import { authMiddleware } from '../token/token';
import { createUserValidation, loginUserValidation } from '../validation/user.validation';
import { parseValidation } from '../config/parseValidation';

const userRouter = express()

userRouter.post('/', createUserValidation(), parseValidation, catchAsync(createUserController))
userRouter.post('/login',loginUserValidation(), parseValidation, catchAsync(loginUserController))
userRouter.get('/', authMiddleware, catchAsync(getLoggedInUser))

export {userRouter}