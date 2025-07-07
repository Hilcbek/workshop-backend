import { body, param } from 'express-validator'
import { bookingValidationMessages } from '../utils/constant';




const createBookingValidation = () => [

  body('workshopId')
    .isInt({ min: 1 })
    .withMessage(bookingValidationMessages.workshopIdInt),

  body('timeSlotId')
    .isInt({ min: 1 })
    .withMessage(bookingValidationMessages.timeSlotIdInt),
]


const updateBookingValidation = () => [
  param('id')
    .isInt({ min: 1 })
    .withMessage(bookingValidationMessages.idInt),

  body('timeSlotId').
    isNumeric()
    .withMessage(bookingValidationMessages.timeSlotIdInt),
]


const getBookingValidation = () => [
  param('id')
    .isInt({ min: 1 })
    .withMessage(bookingValidationMessages.idInt),
]

const deleteBookingValidation = getBookingValidation

export {
  createBookingValidation,
  updateBookingValidation,
  getBookingValidation,
  deleteBookingValidation,
}
