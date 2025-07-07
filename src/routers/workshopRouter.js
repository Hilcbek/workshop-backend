import express from  'express'
import { catchAsync } from '../config/catchAsync';
import { createWorkShopController, deleteWorkShopController, getAllWorkShopsController, getWorkShopController, updateWorkShopController } from '../controllers/workshop.controller';
import { authMiddleware, isAdmin } from '../token/token';
import { createWorkshopValidation, deleteWorkshopValidation, getWorkshopValidation, updateWorkshopValidation } from '../validation/workshop.validation';
import { parseValidation } from '../config/parseValidation';
const workShopRouter = express()

workShopRouter.post('/', createWorkshopValidation(), parseValidation, isAdmin, catchAsync(createWorkShopController))
workShopRouter.patch('/:id', updateWorkshopValidation(), parseValidation, isAdmin, catchAsync(updateWorkShopController))
workShopRouter.delete('/:id', deleteWorkshopValidation(), parseValidation, isAdmin, catchAsync(deleteWorkShopController))
workShopRouter.get('/:id', getWorkshopValidation(),parseValidation,  catchAsync(getWorkShopController))
workShopRouter.get('/', authMiddleware, catchAsync(getAllWorkShopsController))
export {workShopRouter}