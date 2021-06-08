const nodemailer = require("nodemailer")
const {
    validationResult
} = require('express-validator')


module.exports.getIndexPage = (req, res) => {
    console.log("userID:", req.session.userID);
    res.status(200).render('index', {
        page_name: "index"
    })
}
module.exports.getAboutPage = (req, res) => {
    res.status(200).render('about', {
        page_name: "about"
    })
}
module.exports.getLoginPage = (req, res) => {
    res.status(200).render('login', {
        page_name: "login"
    })
}
module.exports.getRegisterPage = (req, res) => {
    res.status(200).render('register', {
        page_name: "register"
    })
}
module.exports.getEventsPage = (req, res) => {
    res.status(200).render('events', {
        page_name: "events"
    })
}
module.exports.getContactPage = (req, res) => {
    res.status(200).render('contact', {
        page_name: "contact"
    })
}
module.exports.sendEmail = async (req, res) => {
  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.ethereal.email",
      port: 587,
      auth: {
        user: "tiffany.rowe35@ethereal.email",
        pass: "9rsqykQDWBQbfYyRzT",
      },
    });
    let outputMessage = `
        <h1>Mail Details </h1>
        <ul>
            <li>Name: ${req.body.name}</li>
            <li>Email: ${req.body.email}</li>
        </ul>
        <h1>Message</h1>
        <p>${req.body.message}</p>`;
    await transporter.sendMail({
      from: `"WebEdu Contact Form" <${req.body.email}>`,
      to: `tiffany.rowe35@ethereal.email, oguzhanselimtemiz@gmail.com`,
      subject: "WebEdu Contact Form ✔",
      html: outputMessage,
    });
    req.flash("success", "We received your message succesfully");
    res.status(200).redirect("/contact");
  } catch (error) {
    req.flash("error", `${error.array()}`);
    res.status(400).redirect("/contact");
  }
};