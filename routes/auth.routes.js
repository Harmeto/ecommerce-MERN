const express = require('express')
/**
 * @name AuthRouter
 * @typedef {express.Router}
 */
const router = express.Router()
const {authMiddleware, isAdmin} = require('../middlewares/auth')

const { 
  createUser, 
  loginUser, 
  getUsers, 
  getUser, 
  deleteUser, 
  updateUser, 
  blockUser,
  unBlockUser,
  logout,
  handleRefreshToken,
  updatePassword,
  forgotPasswordToken ,
  resetPassword,
  loginAdmin,
  getWishList,
  saveAddress,
  userCart,
  getUserCart,
  emptyCart,
  applyCoupon,
  createOrder,
  getOrders,
  updateOrderStatus
} = require('../controllers/userController')

router.post('/register', createUser)
router.post('/login', loginUser)
router.get('/users', getUsers)
router.get('/logout', logout)
router.post('/forgot-password-token', forgotPasswordToken)
router.post('/reset-password/:token', resetPassword)
router.put('/password',authMiddleware, updatePassword)
router.get('/refresh', handleRefreshToken)
router.get('/refresh', handleRefreshToken)
router.get('/wishlist', authMiddleware, getWishList)
router.put('/save-address', authMiddleware, saveAddress)

//cart 
router.post('/cart', authMiddleware, userCart)
router.get('/cart', authMiddleware, getUserCart)
router.get('/get-orders', authMiddleware, getOrders)
router.post('/cart/apply-coupon', authMiddleware, applyCoupon)
router.delete('/empty-cart', authMiddleware, emptyCart)
router.post('/cart/cash-order', authMiddleware, createOrder)

// Admin 
router.put('/update-order/:id', authMiddleware, isAdmin, updateOrderStatus)
router.post('/admin-login', loginAdmin)
router.delete('/:id', deleteUser)
router.put('/edit/', authMiddleware, updateUser)
router.get('/:id', authMiddleware, isAdmin, getUser)
router.put('/block-user/:id', authMiddleware, isAdmin, blockUser)
router.put('/unblock-user/:id', authMiddleware, isAdmin, unBlockUser) 

module.exports = router