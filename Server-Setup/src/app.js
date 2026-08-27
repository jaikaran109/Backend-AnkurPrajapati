const express = require('express');
const mongoose = require('./models/note.model.js');
const noteModel = require('./models/note.model.js');


const app = express();
app.use(express.json());


// POST/notes => Create a note
app.post('/notes',async (req,res) => {

    const data = req.body  // isme object aayega {title,description}
    
    await noteModel.create({
        title: data.title,
        description: data.description
    })

    res.status(201).json({
        Message:"Note created"
    })

})


// GET/notes => Get a note
app.get('/notes', async (req,res) => {


    // agr note find krna ho to 
    // const findNote = await noteModel.findOne({
    //     title : "she"
    // })
    // res.status(200).json({
    //     Message : "Notes fetched successfully",
    //     notes : findNote
    // })



    const notes = await noteModel.find();  // []
    res.status(200).json({
        Message : "Notes fetched successfully",
        notes : notes
    })
});


// DELETE/notes => Delete a note
app.delete('/notes/:id', async (req,res) => {
    const id = req.params.id

    await noteModel.findOneAndDelete({
        _id:id
    })

    res.status(200).json({
        message: "Note deleted successfully"
    })
})


// PATCH/notes => Patch a note
app.patch('/notes/:id', async (req,res) => {
    const id = req.params.id
    const description = req.body.description

    await noteModel.findOneAndUpdate({_id:id},{description:description})

    res.status(200).json({
        message: "Note updates Successfully"
    })
})

module.exports = app;