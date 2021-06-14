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
      req.flash("error", `${error}`);
      res.status(400).redirect("/courses");
    }
}

module.exports.createCourse = async (req, res) => {
  try {
    if (req.session.userRole === "admin") {
      await Course.create({
        name: req.body.name,
        description: req.body.description,
        category: req.body.category,
        user: req.body.user,
      });
      req.flash("success", "Course successfully created");
      res.status(201).redirect("/users/dashboard");
    } else {
      await Course.create({
        name: req.body.name,
        description: req.body.description,
        category: req.body.category,
        user: req.session.userID,
      });
      req.flash("success", "Course successfully created");
      res.status(201).redirect("/courses");
    }
    req.flash("success", "Course successfully created");
  } catch (error) {
    if (error.name === "MongoError" && error.code === 11000) {
      req.flash("error", "Course name must be unique");
    } else {
      req.flash("error", `${error}`);
    }
    res.status(400).redirect("/users/dashboard");
  }
};

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
        user.courses.push({
            _id: req.body.course_id
        })
        user.save()
        req.flash("success", "You're successfully enrolled")
        res.status(200).redirect('/users/dashboard')
    } catch (error) {
        req.flash("error", `${error}`)
        res.status(400).redirect('/users/dashboard')
    }
}

module.exports.unenrollCourse = async (req, res) => {
    try {
        const user = await User.findById(req.session.userID)
        user.courses.pull({
            _id: req.body.course_id
        })
        user.save()
        req.flash("success", "You're successfully unenrolled")
        res.status(200).redirect('/users/dashboard')
    } catch (error) {
        req.flash("error", `${error}`)
        res.status(400).redirect('/users/dashboard')
    }
}

module.exports.deleteCourse = async (req, res) => {
  try {
    if (req.session.userRole === "admin") {
      await Course.findOneAndDelete({
        slug: req.params.slug,
      });
    } else {
      await Course.findOneAndDelete({
        slug: req.params.slug,
        user: req.session.userID,
      });
    }
    req.flash("success", "Course has been removed");
    res.status(200).redirect("/users/dashboard");
  } catch (error) {
    req.flash("error", `${error}`);
    res.status(400).redirect("/users/dashboard");
  }
};

module.exports.updateCourse = async (req, res) => {
  try {
    let course
    if (req.session.userRole === "admin") {
      course = await Course.findOne({
        slug: req.params.slug,
      });
      course.user = req.body.user;
    } else {
      course = await Course.findOne({
        slug: req.params.slug,
        user: req.session.userID,
      });
    }
    course.name = req.body.name;
    course.description = req.body.description;
    course.category = req.body.category;
    course.save(function (err) {
      if (err) {
        if (err.name === "MongoError" && err.code === 11000) {
          req.flash("error", "Course name must be unique");
        } else {
          req.flash("error", `${err.message}`);
        }
        res.status(400).redirect("/users/dashboard");
      } else {
        req.flash("success", "Course successfully updated");
        res.status(200).redirect("/users/dashboard");
      }
    });
  } catch (error) {
    req.flash("error", `${error}`);
    res.status(400).redirect("/users/dashboard");
  }
};