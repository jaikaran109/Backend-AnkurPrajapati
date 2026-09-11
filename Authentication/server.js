require("dotenv").config();
const app = require('./src/app.js')
const connectDB = require('./src/db/db.js')

connectDB()

app.listen(3000, (req,res) => {
    console.log("yoo, I'm running");
    
})