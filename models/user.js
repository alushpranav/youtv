const mongoose = require('mongoose')
const crypto = require('crypto')
const jwt = require('jsonwebtoken')

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true
    },
    hash: {
        type: Buffer,
    },
    salt: {
        type: Buffer
    }
}, { timestamps: true })

userSchema.methods.validatePassword = function (password) {
    let hash = crypto.scryptSync(password, this.salt, 64)
    return crypto.timingSafeEqual(hash, this.hash)
}

userSchema.methods.getSignedJWT = function () {
    return jwt.sign({ username: this.username }, process.env.ACCESS_SECRET, { expiresIn: process.env.JWT_EXPIRE })
}

const user = mongoose.model('user', userSchema)

module.exports = user