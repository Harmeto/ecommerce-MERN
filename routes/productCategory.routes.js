const express = require('express')
const { createCategory, updateCategory, deleteCategory, getAllCategory, getCategory } = require('../controllers/productCategoryController')
const { authMiddleware, isAdmin } = require('../middlewares/auth')

/**
 * @name ProductCategoryRouter 
 * @typedef {express.Router}
 */
const router = express.Router()

router.get('/', getAllCategory)
router.get('/:id', getCategory)
router.post('/', authMiddleware, isAdmin, createCategory)
router.put('/:id', authMiddleware, isAdmin, updateCategory)
router.delete('/:id', authMiddleware, isAdmin, deleteCategory)

module.exports = router