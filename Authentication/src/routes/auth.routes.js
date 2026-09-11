// here we create API's

const express = require('express')
const router = express.Router();


const authController = require('../controllers/auth.controller')


// POST /api/auth/register
router.post("/register",authController.registerUser)

router.get("/test",(req,res) =>{
    console.log("cookies : " , req.cookies);
    res.json({
        message : "Test route",
        cookies : req.cookies
    })
    
})

module.exports = router;