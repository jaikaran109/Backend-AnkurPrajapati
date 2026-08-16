// Dekho jb bhi tm koi bhi changes kroge to POSTMAN me jitna data tha sb loss ho ja rha h
// kyuki tm sara data notes variable me store kr rhe ho jo RAM me store ho rhi h ab jb bhi changes hoti h ya program bnd hota h tb vo variable ko
// randomly new random space allocate ho jati h isiliye vo reset ho ja rha h


const express = require("express");

const app = express();
app.use(express.json()); // this is middleware , it convert the data of postman into json formate , soo it become readable

const notes = []

app.post('/notes' , (req,res) => {  // localhost:3000/notes -- postman with post
    notes.push(req.body); // it push this req.body into notes array

    res.status(201).json({
        message:"notes created successfully"
    });
    
})


app.get("/notes",(req,res) => {  // localhost:3000/notes -- postman with get 
    res.status(201).json({
        message:"notes fetch successfully",
        notes : notes
    })
})



// patch jb existing data update krna ho to use krte h
app.patch("/notes/:index",(req,res) => {
    const index = req.params.index; // index store kr lo jo update krna h 
    const description = req.body.description;  // description store kr lo ek variable me 

    notes[index].description = description;

    res.status(200).json({
        message : "Description updated successfully "
    })

})



/* delete -- /notes/index  --> isme /notes/ to static h kyuki ye change nhi hoga , 
                               index dynamic h kyuki ye change ho rha h aur jb bhi koi cheej dynamic ho to 
                               usko :(colon) ke baad likhte h taki ye indicate ho paye h ki ye dynamic h 
                               
                               aur isme indexing 0 se start hoti h*/

app.delete("/notes/:index",(req,res) => {    // localhost:3000/notes/0 -- postman with delete

    const index = req.params.index ;   // ye store kr rha h index jo params ke through aa rhi h delete krne ko

    delete notes[ index ];

    res.status(200).json({
        message : "Note Deleted Successfully"
    })

})




// AGR URL SE BROWSER PE HI CHANGES KRNE HO TO
// // GET route se delete - taaki browser URL bar se bhi delete ho sake
// app.get("/notes/delete/:index", (req, res) => {  
//     // localhost:3000/notes/delete/2 -- ab ye browser se bhi direct chalega

//     const index = req.params.index;

//     delete notes[index];

//     res.status(200).json({
//         message: "Note Deleted Successfully"
//     });
// });


module.exports = app;