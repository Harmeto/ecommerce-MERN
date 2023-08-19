const asyncHandler = require("express-async-handler");
const Brand = require("../models/Brand");
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
const getAllBrand = asyncHandler(async(_, res)=> {
  try {
    const brand = await Brand.find()
    res.json(brand)
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
const getBrand = asyncHandler(async(_, res)=>{
  const {id} = _.params
  validateMongoDbId(id)
  try {
    const brand = await Brand.findById(id)
    res.json(brand)
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
const createBrand = asyncHandler( async(_, res) => {
  try {
    const newBrand = await Brand.create(_.body)
    res.json(newBrand)
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
const updateBrand = asyncHandler(async(_, res)=>{
  const {id} = _.params
  validateMongoDbId(id)
  try {
    const updateBrand = await Brand.findByIdAndUpdate(id, _.body, { new: true })
    res.json(updateBrand)
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
const deleteBrand = asyncHandler(async(_, res)=>{
  const {id} = _.params
  validateMongoDbId(id)
  try {
    const deleteBrand = await Brand.findOneAndDelete(id)
    res.json(deleteBrand)
  } catch (error) {
    throw new Error(error)
  }
})

module.exports = { getAllBrand, getBrand, createBrand, updateBrand, deleteBrand }