const auth = require('./routes/auth')
const express = require('express')
const morgan = require('morgan')
const mongoose = require('mongoose')
const app = express()
app.use(express.json())

if (process.env.NODE_ENV != 'production') {
    require('dotenv').config()
    app.use(morgan('dev'))
}

mongoose.connect(process.env.CONN_STRING)
const db = mongoose.connection

db.on('err', (e) => console.log(e))
db.once('open', () => console.log('MongoDB Connected!'))

app.get('/', (req, res) => {
    res.status(200).json({ msg: 'Hello from youtv server!' })
})

app.use('/auth', auth)

const PORT = process.env.PORT || 8080
app.listen(PORT, () => console.log(`Listening ${PORT}`))