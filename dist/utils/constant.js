"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.workshopMessagesValidation = exports.workShopMessages = exports.validationMessages = exports.userMessages = exports.userErrorMessages = exports.timeSlotMessages = exports.queueName = exports.passwordRegex = exports.logMessages = exports.emailTemplate = exports.bookingValidationMessages = exports.bookingMessages = exports.ROLE_CONSTANT = void 0;
var _AccountCreatedSuccessfully = require("../templates/AccountCreatedSuccessfully");
var logMessages = exports.logMessages = {
  unAuthorized: 'You are not authorized to access this resource to do this action!',
  sessionExpired: 'Session expired! please',
  mustBeUser: "You must be logged in as a user to access this resource to do this action!"
};
var userErrorMessages = exports.userErrorMessages = {
  userExist: 'User already exist',
  userNotFound: "User not found",
  wrongCredentials: 'Wrong credentials'
};
var userMessages = exports.userMessages = {
  userCreated: 'Account created successfully',
  loggedInUserFetched: 'Account fetched successfully',
  loggedInSuccessful: 'Login successful'
};
var workShopMessages = exports.workShopMessages = {
  workShopCreated: 'Workshop created successfully',
  workShopAlreadyExist: 'Workshop already exist',
  workShopDoesnotExist: 'Workshop does not exist',
  workShopUpdated: 'Workshop updated successfully',
  workShopDeleted: 'Workshop deleted successfully',
  workShopFetched: 'Workshop fetched successfully',
  allWorkShopFetched: 'All workshops fetched successfully'
};
var timeSlotMessages = exports.timeSlotMessages = {
  timeSlotCreated: 'Time slot created successfully',
  timeSlotUpdated: 'Time slot updated successfully',
  timeSlotDeleted: 'Time slot deleted successfully',
  timeSlotFetched: 'Time slot fetched successfully',
  allTimeSlotsFetched: 'All time slots fetched successfully',
  singleTimeSlotFetched: 'Single time slot fetched successfully',
  timeSlotDoesnotExist: 'Time slot does not exist',
  timeSlotIsFull: 'Sorry in this time slot there are no more seats available'
};
var bookingMessages = exports.bookingMessages = {
  bookingCreated: 'Booking created successfully',
  bookingUpdated: 'Booking updated successfully',
  bookingDeleted: 'Booking deleted successfully',
  bookingFetched: 'Booking fetched successfully',
  allBookingsFetched: 'All bookings fetched successfully',
  bookingDoesnotExist: 'Booking does not exist',
  bookingAlreadyExist: 'Booking already exist',
  noRighttoDoThisAction: 'You do not have the right to do this action'
};
var queueName = exports.queueName = 'workshop_queue';
var emailTemplate = exports.emailTemplate = {
  AccountCreated: _AccountCreatedSuccessfully.AccountCreated
};
var ROLE_CONSTANT = exports.ROLE_CONSTANT = {
  USER: 'user',
  ADMIN: 'admin'
};
var validationMessages = exports.validationMessages = {
  startTimeFormat: 'Start time must be in HH:MM AM/PM format (e.g., 10:00 AM)',
  startTimeRange: 'Start time must be between 10:00 AM and 12:00 PM',
  endTimeFormat: 'End time must be in HH:MM AM/PM format (e.g., 12:00 PM)',
  maxCapacityInt: 'maxCapacity must be a positive integer',
  workshopIdInt: 'workshopId must be a positive integer',
  idInt: 'ID must be a positive integer',
  endTimeAfterStartTime: 'endTime must be after startTime'
};
var passwordRegex = exports.passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{6,}$/;
var bookingValidationMessages = exports.bookingValidationMessages = {
  userIdInt: 'userId must be a positive integer',
  workshopIdInt: 'workshopId must be a positive integer',
  timeSlotIdInt: 'timeSlotId must be a positive integer',
  statusEnum: 'status must be one of: pending, confirmed, cancelled',
  idInt: 'Booking ID must be a positive integer'
};
var workshopMessagesValidation = exports.workshopMessagesValidation = {
  titleRequired: 'Title is required and must be a string',
  descRequired: 'Description is required and must be a string',
  dateRequired: 'Date is required and must be a valid ISO date string (e.g., 2025-07-10)',
  idRequired: 'Workshop ID must be a positive integer'
};

// const phoneRegex = /^(\+251|0)?9\d{8}$/