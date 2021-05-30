module.exports.getIndexPage = (req, res) => {
    res.status(200).render('index', {
        page_name: "index",
        title: 'Hey',
        message: 'Hello there!'
    })
}
module.exports.getAboutPage = (req, res) => {
    res.status(200).render('about', {
        page_name: "about"
    })
}