const express = require('express')
const { 
  createProduct,
  getProduct,
  getAllProduct,
  updateProduct,
  deleteProduct,
  addToWishList,
  rating
} = require('../controllers/productController')
const { isAdmin, authMiddleware } = require('../middlewares/auth')
/**
 * @name ProductRouter
 * @typedef {express.Router}
 */
const router = express.Router()

//admin
router.post('/', authMiddleware, isAdmin, createProduct)
router.put('/update/:id', authMiddleware, isAdmin, updateProduct)
router.delete('/:id', authMiddleware, isAdmin, deleteProduct)

//regular
router.get('/', getAllProduct)
router.get('/:id', getProduct)
router.put('/wishlist', authMiddleware, addToWishList)
router.put('/rating', authMiddleware, rating)

module.exports = router