const asyncHandler = require("express-async-handler");
const validateMongoDbId = require("../utils/validateMongodbId");
const Enq = require("../models/Enq");

/**
 * Obtiene todas las categorias de blogs
 * @async
 * @function
 * @param {Object} _ - Request
 * @param {Object} res - Response
 * @throws {Error} Arroja error si no se incluyen datos necesarios
 * @returns {Promise<void>}
 */
const getAllEnq = asyncHandler(async(_, res)=> {
  try {
    const enq = await Enq.find()
    res.json(enq)
  } catch (error) {
    throw new Error(error)
  }
})

/**
 * Obtiene una categoria de blog
 * @async
 * @function
 * @param {Object} _ - Request
 * @param {Object} res - Response
 * @throws {Error} Arroja error si no se incluyen datos necesarios
 * @returns {Promise<void>}
 */
const getEnq = asyncHandler(async(_, res)=>{
  const {id} = _.params
  validateMongoDbId(id)
  try {
    const enq = await Enq.findById(id)
    res.json(enq)
  } catch (error) {
    throw new Error(error)
  }
})

/**
 * Crea una categoria de blog en db
 * @async
 * @function
 * @param {Object} _ - Request
 * @param {Object} res - Response
 * @throws {Error} Arroja error si no se incluyen datos necesarios
 * @returns {Promise<void>}
 */
const createEnq = asyncHandler( async(_, res) => {
  try {
    const newEnq = await Enq.create(_.body)
    res.json(newEnq)
  } catch (error) {
    throw new Error(error)
  }
})

/**
 * Actualiza una categoria de blog en db
 * @async
 * @function
 * @param {Object} _ - Request
 * @param {Object} res - Response
 * @throws {Error} Arroja error si no se incluyen datos necesarios
 * @returns {Promise<void>}
 */
const updateEnq = asyncHandler(async(_, res)=>{
  const {id} = _.params
  validateMongoDbId(id)
  try {
    const updateEnq = await Enq.findByIdAndUpdate(id, _.body, { new: true })
    res.json(updateEnq)
  } catch (error) {
    throw new Error(error)
  }
})

/**
 * Elimina una categoria de blog en db
 * @async
 * @function
 * @param {Object} _ - Request
 * @param {Object} res - Response
 * @throws {Error} Arroja error si no se incluyen datos necesarios
 * @returns {Promise<void>}
 */
const deleteEnq = asyncHandler(async(_, res)=>{
  const {id} = _.params
  validateMongoDbId(id)
  try {
    const deleteEnq = await Enq.findOneAndDelete(id)
    res.json(deleteEnq)
  } catch (error) {
    throw new Error(error)
  }
})

module.exports = { getAllEnq, getEnq, createEnq, updateEnq, deleteEnq }