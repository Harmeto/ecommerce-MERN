const Coupon = require("../models/Coupon");
const asyncHandler = require("express-async-handler");
const validateMongoDbId = require("../utils/validateMongodbId");

const createCoupon = asyncHandler(async (_, res) => {
  try {
    const newCoupon = await Coupon.create(_.body)
    res.json(newCoupon)
  } catch (error) {
    throw new Error(error);
  }
});

const getAllCoupon = asyncHandler(async(_,res)=> {
  try {
    const coupons = await Coupon.find()
    res.json(coupons)
  } catch (error) {
    throw new Error(error);
  }
})

const updateCoupon = asyncHandler(async(_, res)=>{
  const {id} = _.params
  validateMongoDbId(id)
  try {
    const updateCoupon = await Coupon.findByIdAndUpdate(id, _.body, {new:true})
    res.json(updateCoupon)
  } catch (error) {
    throw new Error(error);
  }
})

const deleteCoupon = asyncHandler(async(_, res)=>{
  const {id} = _.params
  validateMongoDbId(id)
  try {
    const deleteCoupon = await Coupon.findByIdAndDelete(id)
    res.json(deleteCoupon)
  } catch (error) {
    throw new Error(error);
  }
})

module.exports = {
  createCoupon,
  getAllCoupon,
  updateCoupon,
  deleteCoupon
};
