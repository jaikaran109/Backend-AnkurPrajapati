const mongoose = require('mongoose');
const dns = require('dns');

// Fix for querySrv ECONNREFUSED on Windows with certain ISPs/routers
dns.setServers(['8.8.8.8', '8.8.4.4']);

async function connectDB() {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Database Connected Successfully');
    } catch (err) {
        console.log("Database connection error:", err.message);
    }
}

module.exports = connectDB;