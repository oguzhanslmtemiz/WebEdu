const express = require("express");

const router = express.Router();
const authController = require("../controllers/authController");
const authMiddleware = require("../middlewares/authMiddleware");
const validationMiddleware = require("../middlewares/validationMiddleware");

router.post("/register", [validationMiddleware.register, authController.createUser]); // http://localhost:5000/users/register
router.post("/login", [validationMiddleware.login, authController.loginUser]);
router.get("/logout", authController.logoutUser);
router.get("/dashboard", [authMiddleware.isUser, authController.getDashboardPage]);
router.delete("/:id", [authMiddleware.isAdmin, authController.deleteUser]);

module.exports = router;
