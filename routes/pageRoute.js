const express = require('express')

const router = express.Router()
const pageController = require('../controllers/pageController')
const redirectMiddleware = require('../middlewares/redirectMiddleware')

router.get('/', pageController.getIndexPage) // http://localhost:5000/
router.get('/about', pageController.getAboutPage)
router.get('/login', [redirectMiddleware, pageController.getLoginPage])
router.get('/register', [redirectMiddleware, pageController.getRegisterPage])
router.get('/events', pageController.getEventsPage)

module.exports = router