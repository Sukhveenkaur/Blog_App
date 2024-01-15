const mongoose=require("mongoose");
const {Schema}=mongoose;
const blogSchema=new mongoose.Schema({
    title:String,
    imageUrl:String,
    content:String,
    user:{
        type:Schema.Types.ObjectId,
        ref:"User"
    },
    isApproved: { type: Boolean, default: false }
})
module.exports=mongoose.model("Blog",blogSchema);