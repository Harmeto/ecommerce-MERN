const express = require('express')
/**
 * @name ColorRoute
 * @typedef {express.Router}
 */
const router = express.Router()
const {authMiddleware, isAdmin} = require('../middlewares/auth')
const { getAllColor, getColor, createColor, updateColor, deleteColor } = require('../controllers/colorController')

router.get('/', getAllColor)
router.get('/:id', getColor)
router.post('/', authMiddleware, isAdmin, createColor)
router.put('/:id', authMiddleware, isAdmin, updateColor)
router.delete('/:id', authMiddleware, isAdmin, deleteColor)

module.exports = router