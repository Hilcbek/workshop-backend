import express from 'express'
import { catchAsync } from '../config/catchAsync';
import { createTimeSlotController, deleteTimeSlotController, getAllTimeSlotsController, getSingleTimeSlotController, getTimeSlotRelatedhWorkShopId, updateTimeSlotController } from '../controllers/timeSlot.controller';
import { authMiddleware, isAdmin } from '../token/token';
import { createTimeSlotValidation, deleteTimeSlotValidation, updateTimeSlotValidation } from '../validation/timeSlot.validation';
import { parseValidation } from '../config/parseValidation';

const timeSlotRouter = express()

timeSlotRouter.post('/',createTimeSlotValidation(), parseValidation, isAdmin, catchAsync(createTimeSlotController))
timeSlotRouter.patch('/:id', updateTimeSlotValidation(), parseValidation, isAdmin, catchAsync(updateTimeSlotController))
timeSlotRouter.delete('/:id', deleteTimeSlotValidation(), parseValidation ,isAdmin, catchAsync(deleteTimeSlotController))
timeSlotRouter.get('/:id', authMiddleware, catchAsync(getSingleTimeSlotController))
timeSlotRouter.get('/', authMiddleware, catchAsync(getAllTimeSlotsController))
timeSlotRouter.get('/time-slot-workshop/:workshopId', authMiddleware, catchAsync(getTimeSlotRelatedhWorkShopId))
export {timeSlotRouter}