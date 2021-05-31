const express = require('express')

const router = express.Router()
const pageController = require('../controllers/pageController')

router.get('/', pageController.getIndexPage) // http://localhost:5000/
router.get('/about', pageController.getAboutPage)
router.get('/login', pageController.getLoginPage)
router.get('/register', pageController.getRegisterPage)

module.exports = router