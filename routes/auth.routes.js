const express = require('express')
/**
 * @name AuthRouter
 * @typedef {express.Router}
 */
const router = express.Router()
const { createUser, loginUser } = require('../controllers/userController')

router.post('/register', createUser)
router.post('/login', loginUser)

module.exports = router