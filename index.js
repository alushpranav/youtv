if (process.env.NODE_ENV != 'production') {
    require('dotenv').config()
}
const express = require('express')
const app = express()

app.get('/', (req, res) => {
    res.status(200).json({ msg: 'Hello from youtv server!' })
})

const PORT = process.env.PORT || 8080
app.listen(PORT, () => console.log(`Listening ${PORT}`))