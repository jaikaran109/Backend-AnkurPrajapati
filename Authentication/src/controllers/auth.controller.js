// yha hm auth files ke logics mention krenge 

const userModel = require('../models/user.model')
const jwt = require('jsonwebtoken')

async function registerUser(req,res){

    const { username , email , password } = req.body;


    // if user already exists
    const isUserAlreadyExists = await userModel.findOne({
        email
    })

    if(isUserAlreadyExists){
        return res.status(409).json({
            message : "User already exists"
        })
    }


    const user = await userModel.create({
        username,email,password
    })

    const token = jwt.sign({
        id:user._id
    },process.env.JWT_SECRET)

    res.cookie("token",token)

    res.status(201).json({
        message : "User registered successfully",
        user,
    })
}

module.exports = {registerUser} // yha tm object form me export kr rhe ho