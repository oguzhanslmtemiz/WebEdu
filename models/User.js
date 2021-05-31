const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
})

userSchema.pre('save', function (next) {
    const user = this
    bcrypt.hash(user.password, 10, function(err, hash) {
        user.password = hash
        next()
    });
})

const User = mongoose.model('User', userSchema)
module.exports = User