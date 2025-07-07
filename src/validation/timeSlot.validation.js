import { body, param } from 'express-validator'
import { ApiError } from '../error/apierror'
import httpStatus from 'http-status'
import { validationMessages } from '../utils/constant';




const startTimeValidator = () =>
  body('startTime')
    .matches(/^((0?[1-9])|(1[0-2])):[0-5][0-9]\s?(AM|PM)$/i)
    .withMessage(validationMessages.startTimeFormat)
    .custom((value) => {
      const [time, modifier] = value.toUpperCase().split(' ')
      const [hourStr, minuteStr] = time.split(':')
      const hour = parseInt(hourStr, 10)
      const minute = parseInt(minuteStr, 10)

      if (modifier !== 'AM' && modifier !== 'PM') {
        throw new ApiError('Time must specify AM or PM', httpStatus.BAD_REQUEST)
      }

      const timeInMinutes = (hour % 12 + (modifier === 'PM' ? 12 : 0)) * 60 + minute

      const min = 10 * 60 
      const max = 12 * 60 

      if (timeInMinutes < min || timeInMinutes > max) {
        throw new ApiError(validationMessages.startTimeRange, httpStatus.BAD_REQUEST)
      }

      return true
    })


const endTimeValidator = () =>
  body('endTime')
    .matches(/^((0?[1-9])|(1[0-2])):[0-5][0-9]\s?(AM|PM)$/i)
    .withMessage(validationMessages.endTimeFormat)


const validateEndTimeAfterStartTime = () =>
  body('endTime').custom((endTime, { req }) => {
    const startTime = req.body.startTime
    if (!startTime || !endTime) return true 

    const parseTime = (timeStr) => {
      const [time, modifier] = timeStr.toUpperCase().split(' ')
      const [hourStr, minuteStr] = time.split(':')
      const hour = parseInt(hourStr, 10)
      const minute = parseInt(minuteStr, 10)
      return (hour % 12 + (modifier === 'PM' ? 12 : 0)) * 60 + minute
    }

    if (parseTime(endTime) <= parseTime(startTime)) {
      throw new ApiError(validationMessages.endTimeAfterStartTime, httpStatus.BAD_REQUEST)
    }
    return true
  })


const createTimeSlotValidation = () =>  [
  startTimeValidator(),
  endTimeValidator(),
  validateEndTimeAfterStartTime(),
  body('maxCapacity')
    .isInt({ min: 1 })
    .withMessage(validationMessages.maxCapacityInt),
  body('workshopId')
    .isInt({ min: 1 })
    .withMessage(validationMessages.workshopIdInt),
]


const updateTimeSlotValidation = () => [
  param('id').isInt({ min: 1 }).withMessage(validationMessages.idInt),
  startTimeValidator().optional(),
  endTimeValidator().optional(),
  validateEndTimeAfterStartTime().optional(),
  body('maxCapacity').optional().isInt({ min: 1 }).withMessage(validationMessages.maxCapacityInt),
  body('workshopId').optional().isInt({ min: 1 }).withMessage(validationMessages.workshopIdInt),
]


const getTimeSlotValidation = () => [
  param('id').isInt({ min: 1 }).withMessage(validationMessages.idInt),
]

const deleteTimeSlotValidation = () => [
  param('id').isInt({ min: 1 }).withMessage(validationMessages.idInt),
]

export {
  createTimeSlotValidation,
  updateTimeSlotValidation,
  getTimeSlotValidation,
  deleteTimeSlotValidation,
}
