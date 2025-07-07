import express from 'express'
import { userRouter } from '../routers/user.router';
import { workShopRouter } from '../routers/workshopRouter';
import { timeSlotRouter } from '../routers/timeSlot.router';
import { bookingRouter } from '../routers/booking.router';
const router =express()
router.use('/user', userRouter)
router.use('/workshops',workShopRouter)
router.use('/time-slot',timeSlotRouter)
router.use('/bookings',bookingRouter)
export {router}