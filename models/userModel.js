import mongoose from "mongoose";
const userSchema =mongoose.Schema({
    name:{type:String,require:true,trim:true},
    email:{type:String,require:true,trim:true},
    password:{type:String,require:true,trim:true},
    tc:{type:Boolean,require:true}
})

const userModel =mongoose.model("User",userSchema);
export default userModel;