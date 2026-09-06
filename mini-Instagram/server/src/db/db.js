const mongoose = require('mongoose')
const dns = require('dns');

dns.setServers(['8.8.8.8', '8.8.4.4']);  // Google's DNS servers force karo

async function connectDB() {
    await mongoose.connect(process.env.MONGO_URI)

    console.log("Connected to DB");
    
}

module.exports = connectDB;