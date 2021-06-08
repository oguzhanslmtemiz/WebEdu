const express = require("express");

const router = express.Router();
const pageController = require("../controllers/pageController");
const redirectMiddleware = require("../middlewares/redirectMiddleware");
const validationMiddleware = require("../middlewares/validationMiddleware");

router.get("/", pageController.getIndexPage); // http://localhost:5000/
router.get("/about", pageController.getAboutPage);
router.get("/login", [redirectMiddleware, pageController.getLoginPage]);
router.get("/register", [redirectMiddleware, pageController.getRegisterPage]);
router.get("/events", pageController.getEventsPage);
router.get("/contact", pageController.getContactPage);
router.post("/contact", [
  validationMiddleware.contact,
  validationMiddleware.rateLimit("/contact"),
  pageController.sendEmail,
]);

module.exports = router;
