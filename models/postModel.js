const mongoose = require('mongoose');
const postSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.ObjectId,
        ref:'User'
    },
    text:{
        type:String,
        required:[true,'please insert some text']
    },
    name:String,
    avatar:String,
    likes:[{
        user:{
            type:mongoose.Schema.ObjectId,
            ref:'User'
        }
    }],
    comments:[{
        user:{
            type:mongoose.Schema.ObjectId,
            ref:'User'
        },
        text:{
            type:String,
            required:[true,'please enter a comment']
        }
    }],
    date:{
        type:Date,
        default:Date.now
    }
},{timestamps:true});

module.exports = mongoose.model('Post',postSchema);