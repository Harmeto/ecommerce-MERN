const asyncHandler = require("express-async-handler");
const Blog = require("../models/Blog");
const User = require("../models/User");
const validateMongoDbId = require("../utils/validateMongodbId");

/**
 * Crea un blog
 * @async
 * @function
 * @param {Object} _ - Request
 * @param {Object} res - Response
 * @throws {Error} Arroja error si no se envian los datos necesarios
 * @returns {Promise<void>} 
 */
const createBlog = asyncHandler(async(_, res)=>{
  try {
    const newBlog = await Blog.create(_.body)
    res.json(newBlog)
  } catch (error) {
    throw new Error(error)
  }
})

/**
 * Actualiza un Blog
 * @async
 * @function
 * @param {Object} _ - Request
 * @param {Object} res - Response
 * @throws {Error} Arroja error si no se envian los datos necesarios
 * @returns {Promise<void>} 
 */
const updateBlog = asyncHandler(async(_, res)=>{
  const {id} = _.params
  try {
    const updateBlog = await Blog.findByIdAndUpdate(id, _.body, {new: true})
    res.json(updateBlog)
  } catch (error) {
    throw new Error(error)
  }
})

/**
 * Visualiza un blog, añade 1 vista al blog visitado
 * @async
 * @function
 * @param {Object} _ - Request
 * @param {Object} res - Response
 * @throws {Error} Arroja error si no se encuentra el blog 
 * @returns {Promise<void>} 
 */
const getBlog = asyncHandler(async(_, res)=>{
  const {id} = _.params
  try {
    const blog = await Blog.findById(id)
    await Blog.findByIdAndUpdate(id, {$inc: {numViews: 1}}, {new: true})
    res.json(blog)
  } catch (error) {
    throw new Error(error)
  }
})

/**
 * Retorna todos los blogs 
 * @async
 * @function
 * @param {Object} _ - Request
 * @param {Object} res - Response
 * @throws {Error} Arroja error si se encuentra ningun blog
 * @returns {Promise<void>} 
 */
const getAllBlog = asyncHandler(async(_, res)=>{
  try {
    const allBlog = await Blog.find()
    res.json(allBlog)
  } catch (error) {
    throw new Error(error)
  }
})

/**
 * Elimina un blog por id
 * @async
 * @function
 * @param {Object} _ - Request
 * @param {Object} res - Response
 * @throws {Error} Arroja error si no se envian los datos necesarios
 * @returns {Promise<void>} 
 */
const deleteBlog = asyncHandler(async(_, res)=>{
  const {id} = _.params
  try {
    const deleteBlog = await Blog.findByIdAndDelete(id)
    res.json(deleteBlog)
  } catch (error) {
    throw new Error(error)
  }
})

module.exports = {createBlog, updateBlog, getBlog, getAllBlog, deleteBlog}
