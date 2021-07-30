// env
require('dotenv').config()

const express = require('express')
const router = require('./src/routers')
const cors = require('cors')

const app = express()

// port yang digunakan untuk start
const port = process.env.PORT || 5000

// digunakan untuk menampilkan isi post data
app.use(express.json())

// cors
app.use(cors())

// get
app.use('/api/dumsound/v1/', router)

// imageFile
app.use('/uploads', express.static('uploads'));


app.listen(port, () => console.log(`yaur server running on port ${port}`))