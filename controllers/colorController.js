const asyncHandler = require("express-async-handler");
const Color = require("../models/Color");
const validateMongoDbId = require("../utils/validateMongodbId");


/**
 * Obtiene todas las categorias de blogs
 * @async
 * @function
 * @param {Object} _ - Request
 * @param {Object} res - Response
 * @throws {Error} Arroja error si no se incluyen datos necesarios
 * @returns {Promise<void>}
 */
const getAllColor = asyncHandler(async(_, res)=> {
  try {
    const Color = await Color.find()
    res.json(Color)
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
const getColor = asyncHandler(async(_, res)=>{
  const {id} = _.params
  validateMongoDbId(id)
  try {
    const Color = await Color.findById(id)
    res.json(Color)
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
const createColor = asyncHandler( async(_, res) => {
  try {
    const newColor = await Color.create(_.body)
    res.json(newColor)
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
const updateColor = asyncHandler(async(_, res)=>{
  const {id} = _.params
  validateMongoDbId(id)
  try {
    const updateColor = await Color.findByIdAndUpdate(id, _.body, { new: true })
    res.json(updateColor)
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
const deleteColor = asyncHandler(async(_, res)=>{
  const {id} = _.params
  validateMongoDbId(id)
  try {
    const deleteColor = await Color.findOneAndDelete(id)
    res.json(deleteColor)
  } catch (error) {
    throw new Error(error)
  }
})

module.exports = { getAllColor, getColor, createColor, updateColor, deleteColor }