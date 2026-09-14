const mongoose = require('mongoose')


const userSchema = new mongoose.Schema({
    username : {
        type : String,
        required : true,
        unique : true,
    },
    email : {
        type : String,
        required : true,
        unique : true,
    },
    password : {
        type : String,
        required : true,
    },
    role : {
        type : String,
        enum : ['user','artist'],  // dekho spotify pe jo acc hoga vo user ka hoga ya artist ka to yha hm input string le rhe h and further classify kr rhe h user / artist , aur iska default value user rakh rhe h
        default : 'user',
    }
})

const userModel = mongoose.model("user",userSchema)

module.exports = userModel;