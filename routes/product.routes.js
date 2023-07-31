const express = require('express')
const { createProduct } = require('../controllers/productController')
/**
 * @name ProductRouter
 * @typedef {express.Router}
 */
const router = express.Router()

router.post('/', createProduct)

module.exports = router