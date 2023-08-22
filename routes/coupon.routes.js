const express = require('express')
/**
 * @name CouponRoute
 * @typedef {express.Router}
 */
const router = express.Router()
const {authMiddleware, isAdmin} = require('../middlewares/auth')
const { createCoupon, getAllCoupon, updateCoupon, deleteCoupon } = require('../controllers/couponController')

router.get('/', authMiddleware, isAdmin, getAllCoupon)
router.post('/', authMiddleware, isAdmin, createCoupon)
router.put('/:id', authMiddleware, isAdmin, updateCoupon)
router.delete('/:id', authMiddleware, isAdmin, deleteCoupon)

module.exports = router