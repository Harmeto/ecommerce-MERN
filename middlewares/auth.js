const User = require('../models/User')
const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')

/**
 * Verifica si token de acceso esta presente
 * @async
 * @function
 * @param {Object} _ - Request  
 * @param {Object} res - Response 
 * @param {MethodDecorator} next - Next Middleware
 */
const authMiddleware = asyncHandler( async (_, res, next) => {
  let token;
  if(_?.headers.authorization.startsWith('Bearer')){
    token = _.headers.authorization.split(' ')[1]
    try {
      if(token){
        const decoded = jwt.verify(token, process.env.SECRET_TOKEN)
        const user = await User.findById( decoded?.id, {deleted: false})
        _.user = user
        next()
      }
    } catch (error) {
      throw new Error('Not Authorized')
    }
  }else{
    throw new Error('There is no token attached to header')
  }
})

/**
 * Verifica si usuario es admin
 * @async
 * @function
 * @param {Object} _ - Request  
 * @param {Object} res - Response 
 * @param {MethodDecorator} next - Next Middleware
 */
const isAdmin = asyncHandler(async (_, res, next) => {
  const { email } = _.user
  const adminUser = await User.findOne({email})
  if(adminUser.role !== 'admin'){
    throw new Error('User Not Authorized')
  }else{
    next()
  }
})

module.exports = {authMiddleware, isAdmin}