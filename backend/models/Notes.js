const mongoose = require("mongoose");
const {Schema} = mongoose;
 const notesSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'users'
    },
    title:{
        type:String,
    },
    content:{
        type:String,
    }
 })


module.exports=mongoose.model('notes',notesSchema);