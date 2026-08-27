const mongoose = require('mongoose');
const dns = require('dns');

dns.setServers(['8.8.8.8', '8.8.4.4']);  // Google's DNS servers force karo

async function connectDB() {
    try {
        await mongoose.connect("mongodb+srv://jaik04227_db_user:WtL6uw646D4YchZt@backend-yt.r1zx72a.mongodb.net/?appName=Backend-yt");
        console.log("MongoDB Connected Successfully!");
    } catch (error) {
        console.error("Database connection failed:", error.message);
    }
}

module.exports = connectDB;