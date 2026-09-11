const express = require('express')
const app = express()
const authRoutes = require('./routes/auth.routes')
const postRoutes = require('./routes/post.routes')
const cookieParser = require('cookie-parser')


app.use(express.json())  // middleware
app.use(cookieParser()); // middle ware for storing cookies


app.use("/api/auth",authRoutes) // dekho maine api router se create kiya to usko access krne ke liye mujhe api/auth prefix use krna pdega
app.use("/api/posts",postRoutes)

module.exports = app;