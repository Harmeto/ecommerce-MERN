const { generateToken } = require('../config/jwtToken')
const User = require('../models/User')
const asyncHandler = require('express-async-handler')

/**
 * Crea un usuario en la base de datos si correo no existe
 * Si correo existe, arroja error
 * @async
 * @function
 * @param {Object} _ - Request
 * @param {Object} res - Response
 * @throws {Error} Arroja error si correo ya existe
 * @returns {Promise<void>} 
 */
const createUser = asyncHandler(async (_, res) => {
  const email = _.body.email
  const findUser = await User.findOne({email})
  if(!findUser){
    // create user 
    const newUser = await User.create(_.body)
    res.json(newUser)
  }else{
    // user already exists
    throw new Error('User already exists')
  }
})

/**
 * Realiza Login de usuario 
 * @async
 * @function
 * @param {Object} _ - Request
 * @param {Object} res - Response
 * @throws {Error} Arroja error si password o email son incorrectos
 * @returns {Promise<void>} 
 */
const loginUser = asyncHandler(async (_, res) => {
  const { email, password } = _.body
  // check if user exists
  const findUser = await User.findOne({email});
  if(findUser && await findUser.isPasswordMatched(password)){
    res.json({
      _id: findUser?._id,
      first_name: findUser?.first_name,
      last_name: findUser?.last_name,
      email: findUser?.email,
      mobile: findUser?.mobile,
      token: generateToken(findUser?._id)
    })
  }else{
    throw new Error('Invalid Credentials')
  }
})

module.exports = {createUser, loginUser}