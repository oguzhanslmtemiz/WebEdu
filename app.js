const express = require('express')

const app = express()

//Template Engine
app.set('view engine', 'ejs')

//Middlewares
app.use(express.static('public'))

//Routes
app.get('/', function (req, res) {
    res.status(200).render('index', {
        page_name: "index",
        title: 'Hey',
        message: 'Hello there!'
    })
})
app.get('/about', (req, res) => {
    res.status(200).render('about', {
        page_name: "about"
    });
  });

const PORT = 5000
app.listen(PORT, () => {
    console.log(`App started on port ${PORT}`);
})