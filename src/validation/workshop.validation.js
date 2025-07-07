import { body, param } from 'express-validator'
import { workshopMessagesValidation } from '../utils/constant';

const createWorkshopValidation =()=> [
  body('title')
    .isString()
    .notEmpty()
    .withMessage(workshopMessagesValidation.titleRequired),

  body('description')
    .isString()
    .notEmpty()
    .withMessage(workshopMessagesValidation.descRequired),

  body('date')
    .isString()
    .withMessage(workshopMessagesValidation.dateRequired),
]


const updateWorkshopValidation =()=> [
  param('id')
    .isInt({ min: 1 })
    .withMessage(workshopMessagesValidation.idRequired),

  body('title')
    .optional()
    .isString()
    .withMessage(workshopMessagesValidation.titleRequired),

  body('description')
    .optional()
    .isString()
    .withMessage(workshopMessagesValidation.descRequired),

  body('date')
    .optional()
    .isISO8601()
    .withMessage(workshopMessagesValidation.dateRequired),
]


const getWorkshopValidation =()=> [
  param('id')
    .isInt({ min: 1 })
    .withMessage(workshopMessagesValidation.idRequired),
]

const deleteWorkshopValidation = getWorkshopValidation

export {
  createWorkshopValidation,
  updateWorkshopValidation,
  getWorkshopValidation,
  deleteWorkshopValidation,
}
