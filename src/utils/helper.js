import bcryptjs from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { JWT_SECRET } from '../config/enviromental';
/**
 * 
 * @param {string} password 
 * @returns {string} 
 */
const encryptPassword = async (password) => {
    const genSalt = await bcryptjs.genSalt(10)
    return bcryptjs.hash(password, genSalt)
}
/**
 * 
 * @param {string} hashedPassword 
 * @param {string} password 
 * @returns {string}
 */
const decryptPassword = async (hashedPassword, password) => {
    return bcryptjs.compare(password, hashedPassword)
}
/**
 * 
 * @param {object} obj 
 * @param {object} prop 
 * @returns {object}
 */
const deletePropertuFromObject = (obj,prop) => {
    for(const key in prop) {
        if(obj.hasOwnProperty(key)){
            delete obj[key]
        }
    }
    return obj
}
/**
 * 
 * @param {object} user 
 * @param {string} expireData 
 * @returns 
 */
const generateJWT = (user, expireData='1d') => {
    return jwt.sign(user, JWT_SECRET, {expiresIn : expireData})
}

export {encryptPassword, decryptPassword, deletePropertuFromObject, generateJWT}