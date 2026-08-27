const dns = require('node:dns');
dns.setDefaultResultOrder('ipv4first');

const app = require('./src/app')
const connectDB = require('./src/db/db')

connectDB() // to connect with mongoDB --> dekho vha se call kr ke server.js me connect kr rhe h

app.listen(3000,() => {
    console.log("server is Running at 3000 port");
})