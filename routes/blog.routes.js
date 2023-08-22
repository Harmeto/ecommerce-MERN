const express = require('express')
/**
 * @name BlogRoute
 * @typedef {express.Router}
 */
const router = express.Router()
const {authMiddleware, isAdmin} = require('../middlewares/auth')
const { createBlog, updateBlog, getBlog, getAllBlog, deleteBlog, likeBlog, disLikeBlog, uploadImages } = require('../controllers/blogController')
const { blogImgResize, uploadPhoto } = require('../middlewares/uploadImages')

router.get('/', getAllBlog)
router.post('/', authMiddleware, isAdmin, createBlog)
router.put('/edit/:id', authMiddleware, isAdmin, updateBlog)
router.get('/:id', getBlog)
router.delete('/:id', authMiddleware, isAdmin, deleteBlog)
router.put('/likes', authMiddleware, likeBlog)
router.put('/dislikes', authMiddleware, disLikeBlog)
// admin upload blog img 
router.put('/upload/:id', authMiddleware, isAdmin, uploadPhoto.array('images', 10), blogImgResize, uploadImages)

module.exports = router