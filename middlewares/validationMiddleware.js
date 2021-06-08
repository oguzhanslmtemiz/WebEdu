const { body, validationResult } = require("express-validator");
const rateLimit = require("express-rate-limit");
const Category = require("../models/Category");
const User = require("../models/User");

module.exports.course = async (req, res, next) => {
  const categories = await Category.find();
  let idOfCategories = [];
  for (let i = 0; i < categories.length; i++) {
    idOfCategories.push(categories[i]._id);
  }

  await body("name")
    .trim()
    .notEmpty()
    .withMessage(" Please enter course name")
    .run(req);
  await body("role")
    .isIn("teacher")
    .withMessage(" You Are Not Authorized to Create Course")
    .run(req);
  await body("description")
    .trim()
    .notEmpty()
    .withMessage(" Please enter a description")
    .run(req);
  await body("category")
    .isIn(idOfCategories)
    .withMessage(" Please select a valid category")
    .run(req);

  const result = validationResult(req).formatWith(({ msg }) => {
    return msg;
  });

  if (!result.isEmpty()) {
    req.flash("error", `${result.array()}`);
    res.status(400).redirect("/users/dashboard");
  } else {
    next();
  }
};

module.exports.rateLimit = (path) => {
  return rateLimit({
    windowMs: 1 * 60 * 1000, // 1 minutes
    max: 3,
    message: "Too many requests, please try again after a minute",
    handler: function (req, res /*, next*/) {
      req.flash("error", `${this.message}`);
      res.status(429).redirect(path);
    },
  });
};

module.exports.contact = async (req, res, next) => {
  await body("name")
    .trim()
    .notEmpty()
    .withMessage(" Please enter your name")
    .run(req);
  await body("email")
    .isEmail()
    .withMessage(" Please enter valid email")
    .run(req);
  await body("message")
    .trim()
    .notEmpty()
    .withMessage(" Please enter a message")
    .run(req);

  const result = validationResult(req).formatWith(({ msg }) => {
    return msg;
  });

  if (!result.isEmpty()) {
    req.flash("error", `${result.array()}`);
    res.status(400).redirect("/contact");
  } else {
    next();
  }
};

module.exports.register = async (req, res, next) => {
  await body("name")
    .trim()
    .notEmpty()
    .withMessage(" Please enter your name")
    .run(req);
  await body("email")
    .isEmail()
    .withMessage(" Please enter valid email")
    .custom(async (bodyEmail) => {
      return await User.findOne({
        email: bodyEmail,
      }).then((user) => {
        if (user) {
          return Promise.reject(" E-mail already in use");
        }
      });
    })
    .run(req);
  await body("role")
    .isIn(["student", "teacher"])
    .withMessage("Your role must be a student or teacher")
    .run(req);
  await body("password")
    .notEmpty()
    .withMessage(" Please enter a password")
    .run(req);

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    for (let i = 0; i < errors.array().length; i++) {
      req.flash("error", errors.array()[i].msg);
    }
    res.status(400).redirect("/register");
  } else {
    next();
  }
};

module.exports.login = async (req, res, next) => {
  await body("email")
    .isEmail()
    .withMessage(" Please enter valid email")
    .run(req);
  await body("password")
    .notEmpty()
    .withMessage(" Please enter a password")
    .run(req);

  const result = validationResult(req).formatWith(({ msg }) => {
    return msg;
  });

  if (!result.isEmpty()) {
    req.flash("error", `${result.array()}`);
    res.status(400).redirect("/login");
  } else {
    next();
  }
};
