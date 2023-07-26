const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,'please enter your name']
    },
    email:{
        type:String,
        required:[true,'please enter your email'],
        unique:true
    },
    password:{
        type:String,
        required:[true,'please enter your password']
    },
    avatar:{
        type:String
    },
    role:{
        type:String,
        default:'user'
    },
    date:{
        type:Date,
        default:Date.now
    },
    passwordChangeAt:{
        type:Date,
        default:Date.now
    }
},{timestamps:true});

userSchema.pre('save',async function(next){
    if(!this.isModified('password')) return next();
    try{
        this.password = await bcrypt.hash(this.password,12);
        next();
    }catch(err){
        return next(err);
    }
});

module.exports = mongoose.model('User',userSchema);