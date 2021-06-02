const express = require('express')

const router = express.Router()
const courseController = require('../controllers/courseController')
const roleMiddleware = require('../middlewares/roleMiddleware')

router.get('/', courseController.getAllCourses) // http://localhost:5000/courses/
router.post('/', [roleMiddleware(["teacher", "admin"]), courseController.createCourse])
router.get('/:slug', courseController.getCourse)
router.post('/:slug/enroll', courseController.enrollCourse)
router.post('/:slug/unenroll', courseController.unenrollCourse)

module.exports = router