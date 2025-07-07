import prisma from "../prismaConfig";
import httpStatus from 'http-status'
import { decryptPassword, deletePropertuFromObject, encryptPassword, generateJWT } from "../utils/helper";
import { ApiError } from "../error/apierror";
import { userErrorMessages, userMessages } from "../utils/constant";
import { workshopQueue } from "../config/worker";
import { USER_EMAIL } from "../config/enviromental";
const createUserController = async function (req, res) {
    // ** check first if a user exist or not
    const doesUserExist = await prisma.user.findFirst({
        where : {
            OR : [
                {
                    username : req.body.username,
                    
                },
                {
                    email : req.body.email
                }
            ]
        }
    })
    if(doesUserExist){
        throw new ApiError(userErrorMessages.userExist, httpStatus.BAD_REQUEST)
    }
    const newUser = await prisma.user.create({
        data : {
           ...req.body,
           password : await encryptPassword(req.body.password)
        }
    })

    
    const mailOptions = {
        from : USER_EMAIL,
        to : newUser.email,
        subject : 'Workshop - Account created successfully!',
        html : 'AccountCreated',
        componentProps: {
            username: newUser.username,
          }
    }
    await workshopQueue.add('email', {
        data : mailOptions,
        type : 'email'
    },{
        backoff: {
          type: 'exponential',
          delay: 1000,
          maxDelay: 10000,
        },
        attempts: 3,
        removeOnComplete: true,
        removeOnFail: true
    })
    res.json({
        data : [{...deletePropertuFromObject(newUser, {password : req.body.password})}],
        status : httpStatus.CREATED,
        message : userMessages.userCreated
    })
}
const loginUserController = async function(req,res){
    const doesUserExist = await prisma.user.findFirst({
        where : {
            OR : [
                {
                    username : req.body.username,
                    
                },
                {
                    email : String(req.body.username).toLowerCase()
                }
            ]
        }
    })
    console.log('doesUserExist ',doesUserExist, req.body)
    if(!doesUserExist){
        throw new ApiError(userErrorMessages.userNotFound, httpStatus.NOT_FOUND)
    }
    const isPasswordCorrect = await decryptPassword(doesUserExist.password, req.body.password)
    if(!isPasswordCorrect){
        throw new ApiError(userErrorMessages.wrongCredentials, httpStatus.UNAUTHORIZED)
    }
    const token = generateJWT({
        id : doesUserExist.id,
        role : doesUserExist.role,
        email : doesUserExist.email
    })
    res.json({
        data : [{
            ...deletePropertuFromObject(doesUserExist, {password :req.body.password}),
            token
        }],
        status : httpStatus.OK,
        message : userMessages.loggedInSuccessful
    })
    
}
const getLoggedInUser = async (req,res,next) => {
    const userId = req.user.id;
    const loggedInUser = await prisma.user.findFirst({
        where : {
            id : userId
        }
    })
    res.json({
        data : [{...deletePropertuFromObject(loggedInUser, {password : loggedInUser.password})}],
        status : httpStatus.OK,
        message : userMessages.loggedInUserFetched
    })
}
export { createUserController, loginUserController, getLoggedInUser}