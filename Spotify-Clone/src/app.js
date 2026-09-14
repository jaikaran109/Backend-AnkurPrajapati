const express = require('express')
const cookieParser = require('cookie-parser')
const authRoutes = require('./routes/auth.routes.js')
const musicRoutes = require('./routes/music.routes.js')

const app = express()
app.use(express.json())      // middleware
app.use(cookieParser())


app.use('/api/auth',authRoutes);
app.use('/api/music',musicRoutes);


module.exports = app;