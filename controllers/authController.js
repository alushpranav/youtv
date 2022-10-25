const User = require('../models/user')

const crypto = require('crypto')

const register = (req, res, next) => {
    let username = req.body.username
    let pwd = req.body.password
    salt = crypto.randomBytes(16)
    hash = crypto.scryptSync(pwd, salt, 64)
    let user = new User({ username, hash, salt })
    user.save()
        .then(doc => res.status(200).json({ msg: 'User Added!' }))
        .catch(e => res.status(501).json({ 'error code': e.code }))
}

const login = (req, res, next) => {
    let usr = req.body.username
    let pwd = req.body.password
    User.findOne({ username: usr }).then(user => {
        if (user) {
            if (user.validatePassword(pwd)) {
                let token = user.getSignedJWT()
                res
                    .cookie('token', token)
                    .status(200).json({ msg: 'Login Successful!', token })
            } else {
                res.status(400).json({ msg: 'Wrong Password!' })
            }
        } else {
            res.status(401).json({ msg: 'User not found!' })
        }
    })
}

module.exports = { register, login }