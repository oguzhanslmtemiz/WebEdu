const express = require("express");

const router = express.Router();
const courseController = require("../controllers/courseController");
const validationMiddleware = require("../middlewares/validationMiddleware");
const authMiddleware = require("../middlewares/authMiddleware");

router.get("/", courseController.getAllCourses); // http://localhost:5000/courses/
router.post("/", [
  authMiddleware.isAuth,
  validationMiddleware.course,
  validationMiddleware.rateLimit("/users/dashboard"),
  courseController.createCourse,
]);
router.get("/:slug", courseController.getCourse);
router.post("/:slug/enroll", [
  authMiddleware.isUser,
  courseController.enrollCourse,
]);
router.post("/:slug/unenroll", [
  authMiddleware.isUser,
  courseController.unenrollCourse,
]);
router.delete("/:slug", [authMiddleware.isAuth, courseController.deleteCourse]);
router.put("/:slug", [
  authMiddleware.isAuth,
  validationMiddleware.course,
  courseController.updateCourse,
]);

module.exports = router;
