const express = require("express");

const router = express.Router();
const courseController = require("../controllers/courseController");
const validationMiddleware = require("../middlewares/validationMiddleware");

router.get("/", courseController.getAllCourses); // http://localhost:5000/courses/
router.post("/", [
  validationMiddleware.course,
  validationMiddleware.rateLimit("/users/dashboard"),
  courseController.createCourse,
]);
router.get("/:slug", courseController.getCourse);
router.post("/:slug/enroll", courseController.enrollCourse);
router.post("/:slug/unenroll", courseController.unenrollCourse);
router.delete("/:slug", courseController.deleteCourse);
router.put("/:slug", [
  validationMiddleware.course,
  courseController.updateCourse,
]);

module.exports = router;
