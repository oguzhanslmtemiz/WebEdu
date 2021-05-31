module.exports.getIndexPage = (req, res) => {
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