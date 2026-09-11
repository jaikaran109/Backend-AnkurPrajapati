const mongoose = require('mongoose')
const dns = require('dns');

dns.setServers(['8.8.8.8', '8.8.4.4']); 

async function connectDB() {
    try{
        await mongoose.connect(process.env.MONGO_URI)

        console.log("Database Connected Successfully");
        
    }
    catch(err){
        console.error("Error hai bhai fix kro ",err);
    }
}


module.exports = connectDB;