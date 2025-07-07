"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateUserValidataion = exports.loginUserValidation = exports.getUserValidation = exports.deleteUserValidation = exports.createUserValidation = void 0;
var _expressValidator = require("express-validator");
var createUserValidation = exports.createUserValidation = function createUserValidation() {
  return [(0, _expressValidator.body)('username').trim().notEmpty().withMessage('Username is required'), (0, _expressValidator.body)('email').isEmail().withMessage('Valid email is required'), (0, _expressValidator.body)('password').matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?#&])[A-Za-z\d@$!%*?#&]{6,}$/).withMessage('Password must be at least 6 characters, and include uppercase, lowercase, number, and special character'), (0, _expressValidator.body)('role').optional().isIn(['admin', 'user']).withMessage('Role must be either "admin" or "user"')];
};
var loginUserValidation = exports.loginUserValidation = function loginUserValidation() {
  return [(0, _expressValidator.check)("username").isString().withMessage("Username is required"), (0, _expressValidator.check)("password").isString().withMessage("Password is required")];
};
var updateUserValidataion = exports.updateUserValidataion = function updateUserValidataion() {
  return [(0, _expressValidator.param)('id').isInt().withMessage('User ID must be an integer'), (0, _expressValidator.body)('username').optional().trim().notEmpty().withMessage('Username cannot be empty'), (0, _expressValidator.body)('email').optional().isEmail().withMessage('Email must be valid'), (0, _expressValidator.body)('password').optional().matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?#&])[A-Za-z\d@$!%*?#&]{8,}$/).withMessage('Password must be secure'), (0, _expressValidator.body)('role').optional().isIn(['admin', 'user']).withMessage('Role must be either "admin" or "user"')];
};
var getUserValidation = exports.getUserValidation = function getUserValidation() {
  return [(0, _expressValidator.param)('id').isInt().withMessage('User ID must be an integer')];
};
var deleteUserValidation = exports.deleteUserValidation = function deleteUserValidation() {
  return [(0, _expressValidator.param)('id').isInt().withMessage('User ID must be an integer')];
};