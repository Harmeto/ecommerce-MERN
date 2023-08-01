const Product = require("../models/Product");
const asyncHandler = require("express-async-handler");
const validateMongoDbId = require("../utils/validateMongodbId");
const { default: slugify } = require("slugify");

/**
 * Crea un Producto en la db
 * @async
 * @function
 * @param {Object} _ - Request
 * @param {Object} res - Response
 * @throws {Error} Arroja error si no se incluyen datos necesarios
 * @returns {Promise<void>}
 */
const createProduct = asyncHandler(async (_, res) => {
  try {
    if (_.body.title) {
      _.body.slug = slugify(_.body.title);
    }
    const newProduct = await Product.create(_.body);
    res.json(newProduct);
  } catch (error) {
    throw new Error(error);
  }
});

/**
 * Modifica un producto por id
 * @async
 * @function
 * @param {Object} _ - Request
 * @param {Object} res - Response
 * @throws {Error} Arroja error si no se incluyen datos necesarios o no encuentra el id 
 * @returns {Promise<void>}
 */
const updateProduct = asyncHandler(async (_, res) => {
  const { id } = _.params;
  validateMongoDbId(id);
  try {
    if (_.body.title) {
      _.body.slug = slugify(_.body.title);
    }

    const updateProduct = await Product.findByIdAndUpdate(id, _.body, {new:true})
    res.json(updateProduct)
  } catch (error) {
    throw new Error(error);
  }
});

/**
 * Elimina un producto por id
 * @async
 * @function
 * @param {Object} _ - Request
 * @param {Object} res - Response
 * @throws {Error} Arroja error si  no encuentra el id 
 * @returns {Promise<void>}
 */
const deleteProduct = asyncHandler(async (_, res) => {
  const { id } = _.params;
  validateMongoDbId(id);
  try {
    const deletedProduct = await Product.findOneAndDelete(id)
    res.json(deletedProduct)
  } catch (error) {
    throw new Error(error);
  }
});

/**
 * Retorna un producto por id
 * @async
 * @function
 * @param {Object} _ - Request
 * @param {Object} res - Response
 * @throws {Error} Arroja error si no se encuentra el id
 * @returns {Promise<void>}
 */
const getProduct = asyncHandler(async (_, res) => {
  const { id } = _.params;
  validateMongoDbId(id);
  try {
    const findProduct = await Product.findById(id);
    res.json(findProduct);
  } catch (error) {
    throw new Error(error);
  }
});

/**
 * Retorna todos los productos
 * @async
 * @function
 * @param {Object} _ - Request
 * @param {Object} res - Response
 * @throws {Error} Arroja error si no se encuentra el id
 * @returns {Promise<void>}
 */
const getAllProduct = asyncHandler(async (_, res) => {
  try {

    // filtering

    const queryObj = {..._.query}
    const excludeFields = ['page', 'sort', 'limit', 'fields']
    excludeFields.forEach((el)=>delete queryObj[el])

    let queryString = JSON.stringify(queryObj)
    queryString = queryObj.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`)

    let query = Product.find(JSON.parse(queryString))
    // endfiltering
    
    // sorting
    
    if(_.query.sort){
      const sortBy = _.query.sort.split(',').join(' ')
      query = query.sort(sortBy)
    }else{
      query = query.sort('-createdAt')
    }
    
    // endsorting
    
    // limit fields 

    if(_.query.fields){
      const fields = _.query.fields.split(',').join(' ')
      query = query.select(fields)
    }else{
      query = query.select('-__v')
    }

    // endlimitfields

    // pagination 

    const page = _.query.page
    const limit = _.query.limit
    const skip = (page -1) * limit
    query = query.skip(skip).limit(limit)
    if(_.query.page){
      const productCount = await Product.countDocuments()
      if(skip >= productCount) throw new Error('This Page does not exist')
    }
    // endpagination
    
    const product = await query
    res.json(product);
  } catch (error) {
    throw new Error(error);
  }
});

module.exports = {
  createProduct,
  getProduct,
  getAllProduct,
  updateProduct,
  deleteProduct
};
