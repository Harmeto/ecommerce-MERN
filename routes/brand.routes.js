const express = require('express')
/**
 * @name BrandRoute
 * @typedef {express.Router}
 */
const router = express.Router()
const {authMiddleware, isAdmin} = require('../middlewares/auth')
const { getAllBrand, getBrand, createBrand, updateBrand, deleteBrand } = require('../controllers/brandController')

router.get('/', getAllBrand)
router.get('/:id', getBrand)
router.post('/', authMiddleware, isAdmin, createBrand)
router.put('/:id', authMiddleware, isAdmin, updateBrand)
router.delete('/:id', authMiddleware, isAdmin, deleteBrand)

module.exports = router