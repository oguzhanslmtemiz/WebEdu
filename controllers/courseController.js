const Course = require('../models/Course')
const Category = require('../models/Category')
const User = require('../models/User')

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
        const searchQuery = req.query.search
        if (searchQuery) {
            filter = {
                name: {
                    $regex: '.*' + searchQuery + '.*',
                    $options: 'ix'
                }
            }
        }

        const categories = await Category.find()
        const courses = await Course.find(filter).sort('-createdAt').populate('user')

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
        await Course.create({
            name: req.body.name,
            description: req.body.description,
            category: req.body.category,
            user: req.session.userID
        })
        res.status(201).redirect('/courses')
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
        }).populate('user')
        const user = await User.findById(req.session.userID)
        res.status(200).render('course', {
            course,
            page_name: "courses",
            user
        })
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            error
        })
    }
}

module.exports.enrollCourse = async (req, res) => {
    try {
        const user = await User.findById(req.session.userID)
        await user.courses.push({
            _id: req.body.course_id
        })
        await user.save()
        res.status(200).redirect('/users/dashboard')
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            error
        })
    }

}

module.exports.unenrollCourse = async (req, res) => {
    try {
        const user = await User.findById(req.session.userID)
        await user.courses.pull({
            _id: req.body.course_id
        })
        await user.save()
        res.status(200).redirect('/users/dashboard')
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            error
        })
    }
}