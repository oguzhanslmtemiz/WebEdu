const express = require('express')
const mongoose = require('mongoose')

const app = express()
const pageRoute = require('./routes/pageRoute')
const courseRoute = require('./routes/courseRoute')

//Connect DB
mongoose.connect('mongodb://localhost/webedu-db', {
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

//Middlewares
app.use(express.static('public'))
app.use(express.json())
app.use(express.urlencoded({
    extended: true
}))

//Routes
app.use(pageRoute)
app.use('/courses', courseRoute)

const PORT = 5000
app.listen(PORT, () => {
    console.log(`App started on port ${PORT}`)
})