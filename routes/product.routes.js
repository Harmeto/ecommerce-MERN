const express = require('express')
const { 
  createProduct,
  getProduct,
  getAllProduct,
  updateProduct,
  deleteProduct
} = require('../controllers/productController')
const { isAdmin, authMiddleware } = require('../middlewares/auth')
/**
 * @name ProductRouter
 * @typedef {express.Router}
 */
const router = express.Router()

//admin
router.post('/', authMiddleware, isAdmin, createProduct)
router.put('/:id', authMiddleware, isAdmin, updateProduct)
router.delete('/:id', authMiddleware, isAdmin, deleteProduct)

//regular
router.get('/', getAllProduct)
router.get('/:id', getProduct)

module.exports = router