const express = require('express')
/**
 * @name AuthRouter
 * @typedef {express.Router}
 */
const router = express.Router()
const { createUser, loginUser, getUsers, getUser, deleteUser } = require('../controllers/userController')

router.post('/register', createUser)
router.post('/login', loginUser)
router.get('/users', getUsers)
router.get('/user/:id', getUser)
router.delete('/user/:id', deleteUser)

module.exports = router