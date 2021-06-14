const Category = require("../models/Category");

module.exports.createCategory = async (req, res) => {
  try {
    await Category.create(req.body);
    req.flash("success", "Category created");
    res.status(201).redirect("/users/dashboard");
  } catch (error) {
    if (error.name === "MongoError" && error.code === 11000) {
      req.flash("error", "Category name must be unique");
    } else {
      req.flash("error", `${error}`);
    }
    res.status(400).redirect("/users/dashboard");
  }
};

module.exports.deleteCategory = async (req, res) => {
  try {
    await Category.findByIdAndDelete(req.params.id);
    req.flash("success", "Category deleted");
    res.status(200).redirect("/users/dashboard");
  } catch (error) {
    req.flash("error", `${error}`);
    res.status(400).redirect("/users/dashboard");
  }
};

module.exports.updateCategory = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    category.name = req.body.name;
    category.save(function (err) {
      if (err) {
        if (err.name === "MongoError" && err.code === 11000) {
          req.flash("error", "Category name must be unique");
        } else {
          req.flash("error", `${err.message}`);
        }
        res.status(400).redirect("/users/dashboard");
      } else {
        req.flash("success", "Category successfully updated");
        res.status(200).redirect("/users/dashboard");
      }
    });
  } catch (error) {
    req.flash("error", `${error}`);
    res.status(400).redirect("/users/dashboard");
  }
};
