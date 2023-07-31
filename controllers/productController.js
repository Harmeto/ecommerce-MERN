const Product = require("../models/Product");
const asyncHandler = require('express-async-handler')

const createProduct = asyncHandler(async (_, res)=>{
  try {
   const newProduct = await Product.create(_.body)
   res.json(newProduct) 
  } catch (error) {
    throw new Error(error)
  }
})

module.exports = {
  createProduct,
}