const express = require('express')

const router = express.Router()
const courseController = require('../controllers/courseController')

router.get('/', courseController.getAllCourses) // http://localhost:5000/courses/
router.post('/', courseController.createCourse)
router.get('/:slug', courseController.getCourse)

module.exports = router