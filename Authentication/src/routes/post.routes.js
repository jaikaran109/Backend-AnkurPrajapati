const express = require('express')
const router = express.Router();
const jwt = require('jsonwebtoken')
const userModel = require('../models/user.model')

router.post("/create",async (req,res) => {
    const token = req.cookies.token;

    if(!token){
        return res.status(401).json({
            message : "Unauthorized"
        })
    }

    // to verify that user ka token aur post ka token same h ki nhi 
    try{
        const decoded = jwt.verify(token,process.env.JWT_SECRET)
        const user = await userModel.findOne({
            _id:decoded.id
        })
        console.log(user);
        
        
    }catch(err){
        return res.status(401).json({
            message:"Token inValid"
        })
    }



    res.send("Post Created Successfully")
})


module.exports = router;