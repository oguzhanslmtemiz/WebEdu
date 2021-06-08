const User = require('../models/User')
const Category = require('../models/Category')
const Course = require('../models/Course')
const bcrypt = require('bcrypt');

module.exports.createUser = async (req, res) => {
    try {
        const user = await User.create(req.body)
        req.session.userID = user._id
        res.status(201).redirect('/users/dashboard')
    } catch (error) {
        req.flash("error", `${error}`)
        res.status(400).redirect('/register')
    }
}

module.exports.loginUser = async (req, res) => {
    try {
        await User.findOne({
            email: req.body.email
        }, async function (err, user) {
            if (user) {
                const match = await bcrypt.compare(req.body.password, user.password)
                if (match) {
                    req.session.userID = user._id
                    res.status(200).redirect('/users/dashboard')
                } else {
                    req.flash("error", "Your password is not correct!")
                    res.status(400).redirect('/login')
                }
            } else {
                req.flash("error", "There is no such e-mail on the system!")
                res.status(400).redirect('/login')
            }
        })
    } catch (error) {
        req.flash("error", `${err}`)
        res.status(400).redirect('/login')
    }
}

module.exports.logoutUser = (req, res) => {
    req.session.destroy(function (err) {
        res.redirect('/')
    })
}

module.exports.getDashboardPage = async (req, res) => {
    const user = await User.findOne({
        _id: req.session.userID
    }).populate('courses')
    const categories = await Category.find()
    const courses = await Course.find({
        user: req.session.userID
    }).populate('category')
    res.status(200).render('dashboard', {
        page_name: "dashboard",
        user,
        categories,
        courses
    })
}