const express = require('express')

const router = express.Router()
const authController = require('../controllers/authController')

router.post('/register', authController.createUser) // http://localhost:5000/users/register
router.post('/login', authController.loginUser)

module.exports = router