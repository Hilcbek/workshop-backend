import prisma from "../prismaConfig";
import httpStatus from 'http-status'
import { workShopMessages } from "../utils/constant";
import { ApiError } from "../error/apierror";

/**
 * 
 * @param {object} req 
 * @param {object} res 
 * 
 * @returns {object}
 */
const createWorkShopController = async function(req,res){
    const doesWorkShopExist = await prisma.workshop.findFirst({
        where : {
            title : req.body.title
        }
    })
    if(doesWorkShopExist){
        throw new ApiError(workShopMessages.workShopAlreadyExist, httpStatus.BAD_REQUEST)
    }
    const newWorkShop = await prisma.workshop.create({
        data :{
            ...req.body,
            date : new Date(req.body.date)
        }
    })
    res.json({
        data : [newWorkShop],
        status : httpStatus.CREATED,
        message : workShopMessages.workShopCreated
    })
}
/**
 * 
 * @param {object} req 
 * @param {object} res 
 * 
 * @returns {object}
 */
const updateWorkShopController = async function(req,res){
    const id = req.params.id
    const doesWorkShopExist = await prisma.workshop.findFirst({
        where : {
            id : parseInt(id)
        },
        include : {
            bookings : true
        }
    })
    if(!doesWorkShopExist){
        throw new ApiError(workShopMessages.workShopDoesnotExist, httpStatus.NOT_FOUND)
    }
    const updatedWorkShop = await prisma.workshop.update({
        where : {
            id : parseInt(id),
        },
        data : {
            ...req.body,
            date : new Date(req.body.date)
        },
        include : {
            bookings : true
        }
    })
    res.json({
        data : [updatedWorkShop],
        status : httpStatus.OK,
        message : workShopMessages.workShopUpdated
    })
}
/**
 * 
 * @param {object} req 
 * @param {object} res 
 * 
 * @returns {object}
 */
const getWorkShopController = async function(req,res){
    const id = Number(req.params.id)
    const doesWorkShopExist = await prisma.workshop.findFirst({
        where : {
            id : parseInt(id)
        },
        include : {
            bookings : true
        }
    })
    if(!doesWorkShopExist){
        throw new ApiError(workShopMessages.workShopDoesnotExist, httpStatus.NOT_FOUND)
    }
    res.json({
        data : [doesWorkShopExist],
        status : httpStatus.OK,
        message : workShopMessages.workShopFetched
    })

}
/**
 * 
 * @param {object} req 
 * @param {object} res 
 * 
 * @returns {object}
 */
const getAllWorkShopsController = async function(req,res){
    const allWorkshops = await prisma.workshop.findMany({
        include: {
            timeSlots: true,
            bookings : true
        }
    });
    res.json({
        data : allWorkshops,
        status : httpStatus.OK,
        message : workShopMessages.allWorkShopFetched
    })

}
/**
 * 
 * @param {object} req 
 * @param {object} res 
 * 
 * @returns {object}
 */
const deleteWorkShopController = async function(req,res){
    console.log('deleteWorkShopController ',typeof req.params.id)
    const id = Number(req.params.id)
    const doesWorkShopExist = await prisma.workshop.findFirst({
        where : {
            id : id
        }
    })
    if(!doesWorkShopExist){
        throw new ApiError(workShopMessages.workShopDoesnotExist, httpStatus.NOT_FOUND)
    }
    await prisma.workshop.delete({
        where : {
            id : id
        }
    })
    res.json({
        data : [doesWorkShopExist],
        status : httpStatus.OK,
        message : workShopMessages.workShopDeleted
    })

}
export {createWorkShopController, updateWorkShopController, getWorkShopController, getAllWorkShopsController, deleteWorkShopController}