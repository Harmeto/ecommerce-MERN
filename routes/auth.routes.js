const express = require('express')
/**
 * @name AuthRouter
 * @typedef {express.Router}
 */
const router = express.Router()
const {authMiddleware, isAdmin} = require('../middlewares/auth')
const { createUser, loginUser, getUsers, getUser, deleteUser, updateUser } = require('../controllers/userController')

router.post('/register', createUser)
router.post('/login', loginUser)
router.get('/users', getUsers)
router.delete('/user/:id', deleteUser)
router.get('/user/:id', authMiddleware, isAdmin, getUser)
router.put('/edit/', authMiddleware, updateUser)
// todo 
router.get('/block-user/:id', authMiddleware, isAdmin, getUser)
router.get('/unblock-user/:id', authMiddleware, isAdmin, getUser)

module.exports = router