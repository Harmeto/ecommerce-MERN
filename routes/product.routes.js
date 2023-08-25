const express = require('express')
const { 
  createProduct,
  getProduct,
  getAllProduct,
  updateProduct,
  deleteProduct,
  addToWishList,
  rating,
  uploadImages,
  deleteImages
} = require('../controllers/productController')
const { isAdmin, authMiddleware } = require('../middlewares/auth')
const { uploadPhoto, productImgResize } = require('../middlewares/uploadImages')
/**
 * @name ProductRouter
 * @typedef {express.Router}
 */
const router = express.Router()

//admin
router.post('/', authMiddleware, isAdmin, createProduct)
router.put('/update/:id', authMiddleware, isAdmin, updateProduct)
router.delete('/:id', authMiddleware, isAdmin, deleteProduct)
// admin upload product img 
router.put('/upload', authMiddleware, isAdmin, uploadPhoto.array('images', 10), productImgResize, uploadImages)
router.delete('/delete-img/:id', authMiddleware, isAdmin, deleteImages)

//regular
router.get('/', getAllProduct)
router.get('/:id', getProduct)
router.put('/wishlist', authMiddleware, addToWishList)
router.put('/rating', authMiddleware, rating)

module.exports = router