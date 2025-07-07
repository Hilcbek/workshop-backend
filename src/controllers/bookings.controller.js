import { ApiError } from "../error/apierror";
import prisma from "../prismaConfig";
import { bookingMessages, ROLE_CONSTANT, timeSlotMessages } from "../utils/constant";
import httpStatus from 'http-status'
const createBookingsController = async function (req, res) {
    const doesBookingExistWitSameTimeSlot = await prisma.booking.findFirst({
        where : {
            timeSlotId : req.body.timeSlotId,
            userId : req.user.id,
            workshopId : req.body.workshopId
        }
    })
    if(doesBookingExistWitSameTimeSlot){
        throw new ApiError(bookingMessages.bookingAlreadyExist, httpStatus.BAD_REQUEST)
    }
    
    const timeSlot = await prisma.timeSlot.findFirst({
        where: {
            id : req.body.timeSlotId
        },
        include : {
            bookings : true
        }
    })
    if(timeSlot.maxCapacity <= timeSlot.bookings.length){
        throw new ApiError(timeSlotMessages.timeSlotIsFull, httpStatus.BAD_REQUEST)
    }
    const newBooking = await prisma.booking.create({
        data : {
            ...req.body,
            userId : req.user.id
        },
        include : {
            timeSlot : true,
            user : {
                select : {
                    id : true,
                    username :true
                }
            },
            workshop : true
        }
    })
    await prisma.timeSlot.update({
        where : {
            id : req.body.timeSlotId
        },
        data : {
            maxCapacity : {
                decrement : 1
            }
        }
    })
    res.json({
        data : [newBooking],
        status : httpStatus.CREATED,
        message : bookingMessages.bookingCreated
    })
}
const updateBookingsController = async function (req, res) {
    const id = Number(req.params.id)
    const doesBookingExist = await prisma.booking.findFirst({
        where: 
        {
            OR: [
                {id : id,
                },
                {
                    userId : req?.user.id
                }
            ]
        },
        include : {
            user : true,
            timeSlot: true,
            workshop: true
        }
        
    })
    if(req.user?.id !== doesBookingExist?.user.id && req?.user.role !== ROLE_CONSTANT.ADMIN){
        throw new ApiError(bookingMessages.noRighttoDoThisAction, httpStatus.NOT_FOUND)
    }
    if(!doesBookingExist){
        throw new ApiError(bookingMessages.bookingNotFound, httpStatus.NOT_FOUND)
    }
    const updatedBooking = await prisma.booking.update({
        where : {
            id : id
        },
        include : {
            timeSlot : true,
            user : {
                select : {
                    id : true,
                    
                }
            },
            workshop : true
        },
      data: {
        timeSlotId: Number(req.body.timeSlotId) || doesBookingExist.timeSlotId,
        status : req.body.status || doesBookingExist.status,
        }
    })
    res.json({
        data : [updatedBooking],
        status : httpStatus.OK,
        message : bookingMessages.bookingUpdated
    })
}
const deleteBookingsController = async function(req,res){
    const id = Number(req.params.id);

    if (isNaN(id)) {
      throw new ApiError('Invalid booking ID.', httpStatus.BAD_REQUEST);
    }
    
    
    const booking = await prisma.booking.findUnique({
      where: { id },
      include: { user: true }
    });
    
    if (!booking) {
      throw new ApiError(bookingMessages.bookingNotFound, httpStatus.NOT_FOUND);
    }
    
    
    if (booking.userId !== req.user.id && req.user.role !== ROLE_CONSTANT.ADMIN) {
      throw new ApiError(bookingMessages.noRighttoDoThisAction, httpStatus.FORBIDDEN);
    }
    
    
    await prisma.timeSlot.update({
      where: { id: booking.timeSlotId },
      data: {
        maxCapacity: { increment: 1 },
      },
    });
    
    
    await prisma.booking.delete({
      where: { id },
    });
    
    
    res.status(httpStatus.OK).json({
      data: [booking],
      status: httpStatus.OK,
      message: bookingMessages.bookingDeleted,
    });
    
}
const getSingleBookingController = async function (req, res) {
    const bookingId = parseInt(req.params.id)
    const booking = await prisma.booking.findFirst({
        where : {
            id : bookingId
        },
        include : {
            timeSlot : true,
            user : {
                select : {
                    id : true,
                   username :true
                }
            },
            workshop: {
                include: {
                    timeSlots: true
                }
            }
        }
    })
    res.json({
        data : [booking],
        status : httpStatus.OK,
        message : bookingMessages.bookingFetched
    })
}
const getAllBookingsController = async function (req, res) {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
  
    const [bookings, total] = await Promise.all([
      prisma.booking.findMany({
        skip,
        take: limit,
        orderBy: {
          createdAt: 'desc', 
        },
        include: {
          timeSlot: true,
          user: {
            select: {
              id: true,
              username: true,
            },
          },
          workshop: true,
        },
      }),
      prisma.booking.count(),
    ]);
  
    const totalPages = Math.ceil(total / limit);
  
    res.json({
      data: bookings,
      meta: {
        total,
        page,
        limit,
        totalPages,
      },
      status: httpStatus.OK,
      message: bookingMessages.allBookingsFetched,
    });
  };
  
const analyticsController = async function(req,res){
    const totalBookings = await prisma.booking.count({
        where: { isDeleted: false }
      });
  
      
      const slotsFilled = await prisma.booking.groupBy({
        by: ['timeSlotId'],
        _count: { id: true }
      });
  
     
      const mostBooked = await prisma.booking.groupBy({
        by: ['workshopId'],
        _count: { id: true },
        orderBy: { _count: { id: 'desc' } },
        take: 1
      });
  
      let popularWorkshop = null;
      if (mostBooked.length > 0) {
        const workshop = await prisma.workshop.findUnique({
          where: { id: mostBooked[0].workshopId },
          select: { title: true }
        });
        popularWorkshop = workshop?.title ?? null;
      }
  
      res.status(200).json({
        data: {
          totalBookings,
        totalTimeSlotsFilled: slotsFilled.length,
        popularWorkshop
        }
        ,
        status: httpStatus.OK,
        message: bookingMessages.analyticsFetched,
      });  
}
const getAllLoggedUserBookingsController = async (req, res) => {
    const userId = req.user.id;
    const bookings = await prisma.booking.findMany({
      where: {
        userId : userId,
        isDeleted: false,
      },
      include: {
        timeSlot: true,
        user: {
          select: {
            id: true,
            username: true,
          },
        },
        workshop: true,
      },
    });
  
    res.json({
      data: bookings,
      status: httpStatus.OK,
      message: bookingMessages.allBookingsFetched,
    });
}
export {createBookingsController, updateBookingsController, deleteBookingsController, getSingleBookingController, getAllBookingsController, analyticsController,getAllLoggedUserBookingsController}