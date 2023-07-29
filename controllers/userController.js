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
  const findUser = await User.findOne({email, deleted: false})
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
  const findUser = await User.findOne({email, deleted: false});
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

/**
 * Retorna todos los Usuarios
 * @async
 * @function
 * @param {Object} _ - Request
 * @param {Object} res - Response
 * @throws {Error} Arroja error si no encuentra usuarios
 * @returns {Promise<void>} 
 */
const getUsers = asyncHandler(async (_, res) => {
  try {
    const users = await User.find({deleted: false}) 
    res.json({users})
  } catch (error) {
    throw new Error(error)
  }
})

/**
 * Retorna un usuario por id
 * @async
 * @function
 * @param {Object} _ - Request
 * @param {Object} res - Response
 * @throws {Error} Arroja error si no encuentra usuarios
 * @returns {Promise<void>} 
 */
const getUser = asyncHandler(async (_, res) => {
  const {id} = _.params
  try {
    const user = await User.findById(id, {deleted: false})
    if(user) return res.json({user})
    throw new Error('User not found', error)
  } catch (error) {
    throw new Error('User not found', error)
  }
})

/**
 * Elimina un usuario por id solo si deleted = false, añade timestamp
 * @async
 * @function
 * @param {Object} _ - Request
 * @param {Object} res - Response
 * @throws {Error} Arroja error si no encuentra usuarios
 * @returns {Promise<void>} 
 */
const deleteUser = asyncHandler(async (_, res) => {
  const {id} = _.params
  const currentDate = new Date();
  try {
    const user = await User.findByIdAndUpdate(id, {  deletedAt: currentDate, deleted: true }, await User.where({deleted: false}))
    res.json({user})
  } catch (error) {
    throw new Error('User not found', error)
  }
})

/**
 * Modifica los campos de un usuario !password
 * @async
 * @function
 * @param {Object} _ - Request
 * @param {Object} res - Response
 * @throws {Error} Arroja error si no encuentra usuarios
 * @returns {Promise<void>} 
 */
const updateUser = asyncHandler(async (_, res) => {
  const {_id} = _.user
  const {first_name, last_name, email, mobile } = _.body
  try {
    const updateUser = await User.findByIdAndUpdate(_id, {first_name, last_name, email, mobile}, await User.where({delete:false}))
    res.json({updateUser})
  } catch (error) {
    throw new Error(error)  
  }
})


module.exports = {createUser, loginUser, getUsers, getUser, deleteUser, updateUser}