const express = require('express')
const mongoose = require('mongoose')
const session = require('express-session')
const MongoStore = require('connect-mongo')

const app = express()
const pageRoute = require('./routes/pageRoute')
const courseRoute = require('./routes/courseRoute')
const categoryRoute = require('./routes/categoryRoute')
const userRoute = require('./routes/userRoute')

//Connect DB
const mongoUrl = 'mongodb://localhost/webedu-db'
mongoose.connect(mongoUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
})
const db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', function () {
    console.log('DB Connected Successfully')
})

//Template Engine
app.set('view engine', 'ejs')

//Global Variable
global.userIN = null

//Middlewares
app.use(express.static('public'))
app.use(express.json())
app.use(express.urlencoded({
    extended: true
}))
app.use(session({
    secret: 'mouse education cat',
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({
        mongoUrl
    })
}))

//Routes
app.use(function (req, res, next) {
    userIN = req.session.userID
    next()
})
app.use('/', pageRoute)
app.use('/courses', courseRoute)
app.use('/categories', categoryRoute)
app.use('/users', userRoute)

const PORT = 5000
app.listen(PORT, () => {
    console.log(`App started on port ${PORT}`)
})