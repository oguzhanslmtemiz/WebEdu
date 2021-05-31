const Course = require('../models/Course')

module.exports.getAllCourses = async (req, res) => {
    try {
        const courses = await Course.find()

        res.status(200).render('courses', {
            status: 'success',
            page_name: "courses",
            courses
        })
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            error
        })
    }
}

module.exports.createCourse = async (req, res) => {
    try {
        const course = await Course.create(req.body)

        res.status(201).json({
            status: 'success',
            course
        })
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            error
        })
    }
}

module.exports.getCourse = async (req, res) => {
    try {
        const course = await Course.findOne({
            slug: req.params.slug
        })

        res.status(200).render('course', {
            course,
            page_name: "courses"
        })
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            error
        })
    }
}