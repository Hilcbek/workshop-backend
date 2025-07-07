import express from 'express'
import { catchAsync } from '../config/catchAsync';
import { analyticsController, createBookingsController, deleteBookingsController, getAllBookingsController, getSingleBookingController, updateBookingsController , getAllLoggedUserBookingsController} from '../controllers/bookings.controller';
import { authMiddleware, isAdmin, isUser } from '../token/token';
import { createBookingValidation, deleteBookingValidation, getBookingValidation, updateBookingValidation } from '../validation/booking.validation';
import { parseValidation } from '../config/parseValidation';
const bookingRouter = express()

bookingRouter.post('/', createBookingValidation(), parseValidation, isUser, catchAsync(createBookingsController))
bookingRouter.patch('/:id', updateBookingValidation(), parseValidation, authMiddleware, catchAsync(updateBookingsController))
bookingRouter.delete('/:id', deleteBookingValidation(), parseValidation, authMiddleware, catchAsync(deleteBookingsController))
bookingRouter.get('/:id', getBookingValidation(), parseValidation, authMiddleware, catchAsync(getSingleBookingController))
bookingRouter.get('/', isAdmin, catchAsync(getAllBookingsController))
bookingRouter.get('/current-user/books', authMiddleware, catchAsync(getAllLoggedUserBookingsController))
bookingRouter.get('/booking/analytics', isAdmin, catchAsync(analyticsController))
export {bookingRouter}