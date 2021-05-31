const Course = require('../models/Course')
const Category = require('../models/Category')

module.exports.getAllCourses = async (req, res) => {
    try {
        const categorySlug = req.query.categories // http://localhost:5000/courses?categories={here}
        const category = await Category.findOne({
            slug: categorySlug
        })

        let filter = {}
        if (categorySlug) {
            filter = {
                category: category._id
            }
        }

        const categories = await Category.find()
        const courses = await Course.find(filter)

        res.status(200).render('courses', {
            status: 'success',
            page_name: "courses",
            categorySlug: categorySlug,
            courses,
            categories
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