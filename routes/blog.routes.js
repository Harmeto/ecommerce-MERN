const express = require('express')
/**
 * @name BlogRoute
 * @typedef {express.Router}
 */
const router = express.Router()
const {authMiddleware, isAdmin} = require('../middlewares/auth')
const { createBlog, updateBlog, getBlog, getAllBlog, deleteBlog, likeBlog } = require('../controllers/blogController')

router.get('/', getAllBlog)
router.post('/', authMiddleware, isAdmin, createBlog)
router.put('/edit/:id', authMiddleware, isAdmin, updateBlog)
router.get('/:id', getBlog)
router.delete('/:id', authMiddleware, isAdmin, deleteBlog)
router.put('/likes', authMiddleware, likeBlog)

module.exports = router