const express = require('express')
const multer = require('multer')
const postModel = require('./models/post.model'); 
const uploadFile = require('./services/storage.service')
const cors = require('cors')  // send data to frontend


const app = express();
app.use(cors()) //  it is act as a middle ware
app.use(express.json())

const upload = multer({storage: multer.memoryStorage()})

app.post("/create-post", upload.single("image"), async (req,res) => {
    console.log(req.body);
    console.log(req.file);
    

    const result = await uploadFile(req.file.buffer)

    const post = await postModel.create({
        image: result.url,
        caption: req.body.caption
    })

    return res.status(201).json({
        message:"Post Created Successfully",
        post
    })
})

app.get("/posts",async (req,res) => {
    const posts = await postModel.find()

    return res.status(200).json({
        message:"Posts fetched successfully",
        posts
    })
})


module.exports = app;