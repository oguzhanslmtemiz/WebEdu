const express = require("express");

const router = express.Router();
const categoryController = require("../controllers/categoryController");
const validationMiddleware = require("../middlewares/validationMiddleware");
const authMiddleware = require("../middlewares/authMiddleware");

router.post("/", [
  authMiddleware.isAuth,
  validationMiddleware.category,
  categoryController.createCategory,
]); // http://localhost:5000/categories/
router.delete("/:id", [
  authMiddleware.isAdmin,
  categoryController.deleteCategory,
]);
router.put("/:id", [authMiddleware.isAdmin, categoryController.updateCategory]);

module.exports = router;
