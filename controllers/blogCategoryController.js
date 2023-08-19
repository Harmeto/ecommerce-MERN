const asyncHandler = require("express-async-handler");
const BlogCategory = require("../models/BlogCategory");
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
const getAllCategory = asyncHandler(async(_, res)=> {
  try {
    const categories = await BlogCategory.find()
    res.json(categories)
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
const getCategory = asyncHandler(async(_, res)=>{
  const {id} = _.params
  validateMongoDbId(id)
  try {
    const category = await BlogCategory.findById(id)
    res.json(category)
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
const createCategory = asyncHandler( async(_, res) => {
  try {
    const newCategory = await BlogCategory.create(_.body)
    res.json(newCategory)
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
const updateCategory = asyncHandler(async(_, res)=>{
  const {id} = _.params
  validateMongoDbId(id)
  try {
    const updateCategory = await BlogCategory.findByIdAndUpdate(id, _.body, { new: true })
    res.json(updateCategory)
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
const deleteCategory = asyncHandler(async(_, res)=>{
  const {id} = _.params
  validateMongoDbId(id)
  try {
    const deleteCategory = await BlogCategory.findOneAndDelete(id)
    res.json(deleteCategory)
  } catch (error) {
    throw new Error(error)
  }
})

module.exports = { createCategory, updateCategory, deleteCategory, getAllCategory, getCategory }