const mongoose=require("mongoose")

const userSchema= new mongoose.Schema({
    name:{type:String, required:true},
    email:{type:String, required:true},
    password:{type:String, required:true}
}) //add {timestamps:true} if u need to store created n updated time


//creating model for interaction
const User=mongoose.model("User",userSchema)

//exporting the model
module.exports=User;