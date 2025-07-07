import { body, check, param } from 'express-validator'

const createUserValidation= () => [
  body('username')
    .trim()
    .notEmpty().withMessage('Username is required'),

  body('email')
    .isEmail().withMessage('Valid email is required'),

  body('password')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?#&])[A-Za-z\d@$!%*?#&]{6,}$/)
    .withMessage('Password must be at least 6 characters, and include uppercase, lowercase, number, and special character'),

  body('role')
    .optional()
    .isIn(['admin', 'user']).withMessage('Role must be either "admin" or "user"'),
]

const loginUserValidation = () => [
    check("username").isString().withMessage("Username is required"),
    check("password").isString().withMessage("Password is required"),
]

const updateUserValidataion = () => [
  param('id')
    .isInt().withMessage('User ID must be an integer'),

  body('username')
    .optional()
    .trim()
    .notEmpty().withMessage('Username cannot be empty'),

  body('email')
    .optional()
    .isEmail().withMessage('Email must be valid'),

  body('password')
    .optional()
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?#&])[A-Za-z\d@$!%*?#&]{8,}$/)
    .withMessage('Password must be secure'),

  body('role')
    .optional()
    .isIn(['admin', 'user']).withMessage('Role must be either "admin" or "user"'),
]


const getUserValidation = () => [
  param('id')
    .isInt().withMessage('User ID must be an integer'),
]


const deleteUserValidation = () => [
  param('id')
    .isInt().withMessage('User ID must be an integer'),
]

export {createUserValidation, updateUserValidataion, getUserValidation, deleteUserValidation,loginUserValidation}