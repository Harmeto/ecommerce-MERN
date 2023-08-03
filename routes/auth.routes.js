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
  resetPassword
} = require('../controllers/userController')

router.post('/register', createUser)
router.post('/login', loginUser)
router.get('/users', getUsers)
router.get('/logout', logout)
router.post('/forgot-password-token', forgotPasswordToken)
router.post('/reset-password/:token', resetPassword)
router.put('/password',authMiddleware, updatePassword)
router.get('/refresh', handleRefreshToken)

// Admin 
router.delete('/:id', deleteUser)
router.put('/edit/', authMiddleware, updateUser)
router.get('/:id', authMiddleware, isAdmin, getUser)
router.put('/block-user/:id', authMiddleware, isAdmin, blockUser)
router.put('/unblock-user/:id', authMiddleware, isAdmin, unBlockUser)

module.exports = router