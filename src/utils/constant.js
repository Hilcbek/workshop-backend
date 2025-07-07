const logMessages = {
    unAuthorized : 'You are not authorized to access this resource to do this action!',
    sessionExpired : 'Session expired! please',
    mustBeUser : `You must be logged in as a user to access this resource to do this action!`
}
const userErrorMessages = {
    userExist : 'User already exist',
    userNotFound : "User not found",
    wrongCredentials : 'Wrong credentials',
}
const userMessages = {
    userCreated : 'Account created successfully',
    loggedInUserFetched : 'Account fetched successfully',
    loggedInSuccessful :   'Login successful'
}
const workShopMessages = {
    workShopCreated : 'Workshop created successfully',
    workShopAlreadyExist : 'Workshop already exist',
    workShopDoesnotExist : 'Workshop does not exist',
    workShopUpdated : 'Workshop updated successfully',
    workShopDeleted : 'Workshop deleted successfully',
    workShopFetched : 'Workshop fetched successfully',
    allWorkShopFetched : 'All workshops fetched successfully'
}

const timeSlotMessages = {
    timeSlotCreated : 'Time slot created successfully',
    timeSlotUpdated : 'Time slot updated successfully',
    timeSlotDeleted : 'Time slot deleted successfully',
    timeSlotFetched : 'Time slot fetched successfully',
    allTimeSlotsFetched : 'All time slots fetched successfully',
    singleTimeSlotFetched : 'Single time slot fetched successfully',
    timeSlotDoesnotExist : 'Time slot does not exist',
    timeSlotIsFull : 'Sorry in this time slot there are no more seats available',
}

const bookingMessages = {
    bookingCreated : 'Booking created successfully',
    bookingUpdated : 'Booking updated successfully',
    bookingDeleted : 'Booking deleted successfully',
    bookingFetched : 'Booking fetched successfully',
    allBookingsFetched : 'All bookings fetched successfully',
    bookingDoesnotExist : 'Booking does not exist',
    bookingAlreadyExist : 'Booking already exist',
    noRighttoDoThisAction : 'You do not have the right to do this action'
}

const queueName = 'workshop_queue'

const ROLE_CONSTANT = {
    USER : 'user',
    ADMIN : 'admin'
}
const validationMessages = {
  startTimeFormat: 'Start time must be in HH:MM AM/PM format (e.g., 10:00 AM)',
  startTimeRange: 'Start time must be between 10:00 AM and 12:00 PM',
  endTimeFormat: 'End time must be in HH:MM AM/PM format (e.g., 12:00 PM)',
  maxCapacityInt: 'maxCapacity must be a positive integer',
  workshopIdInt: 'workshopId must be a positive integer',
  idInt: 'ID must be a positive integer',
  endTimeAfterStartTime: 'endTime must be after startTime',
}

const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{6,}$/

const bookingValidationMessages = {
  userIdInt: 'userId must be a positive integer',
  workshopIdInt: 'workshopId must be a positive integer',
  timeSlotIdInt: 'timeSlotId must be a positive integer',
  statusEnum: 'status must be one of: pending, confirmed, cancelled',
  idInt: 'Booking ID must be a positive integer',
}
const workshopMessagesValidation = {
  titleRequired: 'Title is required and must be a string',
  descRequired: 'Description is required and must be a string',
  dateRequired: 'Date is required and must be a valid ISO date string (e.g., 2025-07-10)',
  idRequired: 'Workshop ID must be a positive integer',
}


// const phoneRegex = /^(\+251|0)?9\d{8}$/
export {logMessages, userErrorMessages, userMessages,workShopMessages, timeSlotMessages, bookingMessages,queueName, ROLE_CONSTANT,passwordRegex, validationMessages,bookingValidationMessages,workshopMessagesValidation}