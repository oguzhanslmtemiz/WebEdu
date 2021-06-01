const User = require('../models/User')
const bcrypt = require('bcrypt');

module.exports.createUser = async (req, res) => {
    try {
        const user = await User.create(req.body)

        res.status(201).json({
            status: 'success',
            user
        })
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            error
        })
    }
}

module.exports.loginUser = async (req, res) => {
    try {
        await User.findOne({
            email: req.body.email
        }, async function (err, user) {
            if (user) {
                const match = await bcrypt.compare(req.body.password, user.password)
                if (match) {
                    req.session.userID = user._id
                    res.status(200).redirect('/')
                } else {
                    res.status(400).send('Wrong Password <a href="/login">Back</a>')
                }
            } else {
                res.status(404).send('There is no such e-mail on the system <a href="/login">Back</a>')
            }
        })
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            error
        })
    }
}

module.exports.logoutUser = (req, res) => {
    req.session.destroy(function (err) {
        res.redirect('/')
    })
}