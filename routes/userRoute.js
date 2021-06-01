const express = require('express')

const router = express.Router()
const authController = require('../controllers/authController')
const authMiddleware = require('../middlewares/authMiddleware')

router.post('/register', authController.createUser) // http://localhost:5000/users/register
router.post('/login', authController.loginUser)
router.get('/logout', authController.logoutUser)
router.get('/dashboard', [authMiddleware, authController.getDashboardPage])

module.exports = router