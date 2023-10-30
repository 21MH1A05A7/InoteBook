const mongoose = require("mongoose");
 const UserSchema = new mongoose.Schema({
    email:{
        type:String,
        required: true,
        unique: true
    },
    password:{
        type:String,
        required: true
    }
 })

const User = mongoose.model('users',UserSchema)
User.createIndexes();
module.exports=User;