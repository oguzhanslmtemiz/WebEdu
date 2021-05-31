const express = require('express')

const router = express.Router()
const courseController = require('../controllers/courseController')

router.get('/', courseController.getAllCourses) // http://localhost:5000/course/
router.post('/', courseController.createCourse)
router.get('/:slug', courseController.getCourse)

module.exports = router