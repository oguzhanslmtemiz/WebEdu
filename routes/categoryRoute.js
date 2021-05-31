const express = require('express')

const router = express.Router()
const categoryController = require('../controllers/categoryController')

router.post('/', categoryController.createCategory) // http://localhost:5000/categories/

module.exports = router