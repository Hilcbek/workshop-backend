import prisma from "../prismaConfig";
import httpStatus from 'http-status'
import { timeSlotMessages } from "../utils/constant";
import { ApiError } from "../error/apierror";
const createTimeSlotController = async function(req, res) {
    const { startTime, endTime, maxCapacity, workshopId } = req.body;
    const existingSlot = await prisma.timeSlot.findFirst({
      where: {
        startTime,
        endTime,
        workshopId: Number(workshopId),
        isDeleted: false, // optional: exclude deleted slots
      }
    });
  
    if (existingSlot) {
      throw new ApiError('Time slot already exists for this workshop', httpStatus.CONFLICT)
    }
    const newTimeSlot = await prisma.timeSlot.create({
      data: {
        startTime,
        endTime,
        maxCapacity,
        workshop: {
          connect: { id: Number(workshopId) }
        }
      }
    });
  
    return res.status(httpStatus.CREATED).json({
      data: newTimeSlot,
      status: httpStatus.CREATED,
      message: timeSlotMessages.timeSlotCreated
    });
  };
  
const updateTimeSlotController = async function(req,res){
    const id = req.params.id
    const doesTimeSlotExist = await prisma.timeSlot.findFirst({
        where : {
            id : Number(id)
        }
    })
    if(!doesTimeSlotExist){
        throw new ApiError(timeSlotMessages.timeSlotDoesnotExist, httpStatus.NOT_FOUND)
    }
    const updatedTimeSlot = await prisma.timeSlot.update({
        where : {
            id : Number(id)
        },
        data : {
            ...req.body
        },
        include : {
            bookings : true,
            workshop : true
        }
    })
    res.json({
        data : updatedTimeSlot,
        status : httpStatus.OK,
        message : timeSlotMessages.timeSlotUpdated
    })
}
const deleteTimeSlotController = async function(req,res){
    const id = Number(req.params.id)
    const doesTimeSlotExist = await prisma.timeSlot.findFirst({
        where : {
            id
        }
    })
    if(!doesTimeSlotExist){
        throw new ApiError(timeSlotMessages.timeSlotDoesnotExist, httpStatus.NOT_FOUND)
    }
    await prisma.timeSlot.delete({
        where : {
            id
        }
    })
    res.json({
        data : doesTimeSlotExist,
        status : httpStatus.OK,
        message : timeSlotMessages.timeSlotDeleted
    })
}
const getAllTimeSlotsController = async function(req,res){
    const allTimeSlots = await prisma.timeSlot.findMany({
        include : {
            bookings : true,
            workshop : true
        }
    })
    res.json({
        data : allTimeSlots,
        status : httpStatus.OK,
        message : timeSlotMessages.timeSlotsFetched
    })
}
const getSingleTimeSlotController = async function(req,res){
    const id = req.params.id
    console.log('id ',id)
    const doesTimeSlotExist = await prisma.timeSlot.findFirst({
        where : {
            id : Number(id)
        },
        include : {
            bookings : true,
            workshop : true
        }
    })
    if(!doesTimeSlotExist){
        throw new ApiError(timeSlotMessages.timeSlotDoesnotExist, httpStatus.NOT_FOUND)
    }
    res.json({
        data : [doesTimeSlotExist],
        status : httpStatus.OK,
        message : timeSlotMessages.timeSlotFetched
    })
}

const getTimeSlotRelatedhWorkShopId = async function (req, res) {
    const workshopId = req.params.workshopId
    const timeSlots = await prisma.timeSlot.findMany({
      where: {
        workshopId: parseInt(workshopId),
      },
      include : {
        bookings : true,
        workshop : true
      }
    });
    res.json({
      data: timeSlots,
      status: httpStatus.OK,
      message: timeSlotMessages.allTimeSlotsFetched,
    });
};
export {createTimeSlotController, updateTimeSlotController, deleteTimeSlotController, getAllTimeSlotsController, getSingleTimeSlotController,getTimeSlotRelatedhWorkShopId}