const express = require('express')
/**
 * @name EnqRoute
 * @typedef {express.Router}
 */
const router = express.Router()
const {authMiddleware, isAdmin} = require('../middlewares/auth')
const { getAllEnq, getEnq, createEnq, updateEnq, deleteEnq } = require('../controllers/enqController')

router.get('/', getAllEnq)
router.get('/:id', getEnq)
router.post('/', authMiddleware, isAdmin, createEnq)
router.put('/:id', authMiddleware, isAdmin, updateEnq)
router.delete('/:id', authMiddleware, isAdmin, deleteEnq)

module.exports = router