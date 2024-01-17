
const mongoose = require('mongoose');
const { Schema } = mongoose;

let userSchema = new mongoose.Schema({
    username: String,
    password: String,
    email:String,
    // email: {
    //     type: String,
    //     required: true,
   
    //     unique:true
    // },
    role: { type: String, default: 'user' },
    blog: [
        {
            type: Schema.Types.ObjectId,
            ref: "Blog"
        }
    ],
    pendingBlogs: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Blog' }]
});

module.exports = mongoose.model("User", userSchema);
