const mongoose = require('mongoose')


const postSchema = new mongoose.Schema({
    image: String,
    caption:String
})


//diff type ke data diff collections me store hoti h -> posts,users,etc etc
const postModel = mongoose.model("post",postSchema);  // yha jo post h vo ek collection h jisme posts ka data store hoga 

module.exports = postModel;