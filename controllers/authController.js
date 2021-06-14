const User = require('../models/User')
const Category = require('../models/Category')
const Course = require('../models/Course')
const bcrypt = require('bcrypt');

module.exports.createUser = async (req, res) => {
    try {
        const user = await User.create(req.body)
        req.session.userID = user._id
        req.session.userRole = user.role
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
                    req.session.userRole = user.role
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
  try {
    const user = await User.findOne({
      _id: req.session.userID,
    }).populate("courses");
    const categories = await Category.find();
    const courses = await Course.find({
      user: req.session.userID,
    }).populate("category");

    if (user.role === "admin") {
      const users = await User.find();
      const courses = await Course.find().populate(["category", "user"]);
      const teachers = users.filter((user) => {
        return user.role === "teacher";
      });
      res.status(200).render("dashboard", {
        page_name: "dashboard",
        user,
        categories,
        courses,
        users,
        teachers,
      });
    } else {
      res.status(200).render("dashboard", {
        page_name: "dashboard",
        user,
        categories,
        courses,
      });
    }
  } catch (error) {
    req.session.destroy(() => {
      res.redirect("/");
    });
  }
};

module.exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (user.role !== "student") {
      await Course.deleteMany({ user: req.params.id });
    }
    req.flash("success", "User deleted");
    res.status(200).redirect("/users/dashboard");
  } catch (error) {
    req.flash("error", `${error}`);
    res.status(400).redirect("/users/dashboard");
  }
};