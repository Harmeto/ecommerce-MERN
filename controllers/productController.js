const Product = require("../models/Product");
const User = require('../models/User')
const asyncHandler = require("express-async-handler");
const validateMongoDbId = require("../utils/validateMongodbId");
const cloudinaryUploadImg = require('../utils/cloudinary');
const fs = require('fs')
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

    const queryObj = {... _.query}
    const excludeFields = ['page', 'sort', 'limit', 'fields']
    excludeFields.forEach((el)=>delete queryObj[el])

    let queryString = JSON.stringify(queryObj)
    queryString = queryString.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`)

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

/**
 * Añade un producto a WishList 
 * @async
 * @function
 * @param {Object} _ - Request
 * @param {Object} res - Response
 * @throws {Error} Arroja error si no se encuentra el producto o user 
 * @returns {Promise<void>}
 */
const addToWishList = asyncHandler(async(_, res)=> {
  const {_id} = _.user
  const {prodId} = _.body
  try {
    const user = await User.findById(_id)
    const alreadyAdded = user.wishlist.find((_id)=> _id.toString() === prodId)
    if(alreadyAdded){
      let user = await User.findByIdAndUpdate(_id, {
        $pull:{wishlist: prodId},
        },
        {new: true}
      )
      return res.json(user)
    }else{
      let user = await User.findByIdAndUpdate(_id, {
        $push:{wishlist: prodId},
        },
        {new: true}
      )
      return res.json(user)
    }
  } catch (error) {
    throw new Error(error);
  }
})

/**
 * Añade rating a producto 
 * @async
 * @function
 * @param {Object} _ - Request
 * @param {Object} res - Response
 * @throws {Error} Arroja error si no se encuentra el producto o user 
 * @returns {Promise<void>}
 */
const rating = asyncHandler(async(_, res)=> {
  const {_id} = _.user
  const {star, prodId, comment} = _.body
  try {
    const product = await Product.findById(prodId)
    let alreadyRated = product.ratings.find((userId) => userId.postedby.toString() === _id.toString() )

    if(alreadyRated){
      const updateRating = await Product.updateOne({
        ratings:{$elemMatch: alreadyRated},
      },  {
        $set: {"ratings.$.star": star, "ratings.$.comment": comment}
      }, 
      {new:true})
    }else{
      const rateProduct = await Product.findByIdAndUpdate(prodId, {
        $push:{
          ratings: {
            star: star, 
            comment: comment,
            postedby: _id,
          },
        },
      },{new: true})
    }
    const getAllRatings = await Product.findById(prodId)
    let totalrating = getAllRatings.ratings.length
    let ratingSum = getAllRatings.ratings.map((item) => item.star ).reduce((prev, curr)=> prev + curr, 0) 
    let actualRating = Math.round(ratingSum / totalrating )
    let finalProduct = await Product.findByIdAndUpdate(prodId, 
    {
      totalRatings: actualRating,
    }, {new: true})
    res.json(finalProduct)
  } catch (error) {
     throw new Error(error);
  }

})

/**
 * Sube imagenes a un producto
 * @async
 * @function
 * @param {Object} _ - Request
 * @param {Object} res - Response
 * @throws {Error} Arroja error si no se envian los datos necesarios
 * @returns {Promise<void>}
 */
const uploadImages = asyncHandler(async(_, res) => {
  const {id} = _.params
  validateMongoDbId(id)

  try {
    const uploader = (path) => cloudinaryUploadImg(path, 'images');
    let urls = []
    const files = _.files

    for(const file of files ){
      const {path} = file
      const newPath = await uploader(path)
      urls.push(newPath)
      fs.unlinkSync(path)
    }
    const findProduct = await Product.findByIdAndUpdate(id, {
      images: urls.map(file => { return file })
    }, {new: true})

    res.json(findProduct)
  } catch (error) {
    throw new Error(error);
  }
})

module.exports = {
  createProduct,
  getProduct,
  getAllProduct,
  updateProduct,
  deleteProduct,
  addToWishList,
  rating, 
  uploadImages
};
