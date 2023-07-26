
const User =require('../models/userModel');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

exports.createUser = catchAsync(async (request,response,next)=>{
    const user = await User.create({
        name:request.body.name,
        email:request.body.email,
        avatar:request.body.avatar
    });
    response.status(201).json({
        status:'success',
        data:{
            user
        }
    })
});

exports.getAllUsers = catchAsync(async (request,response,next)=>{
    const users = await User.find();
    response.status(200).json({
        status:'success',
        data:{
            users
        }
    })
});

exports.getUser = catchAsync(async (request,response,next)=>{
    const user = await User.findById(request.params.id);
    if(!user){
        return next(new AppError('invalid user',403));
    }
    response.status(200).json({
        status:'success',
        data:{
            user
        }
    })
});

exports.updateUser = catchAsync(async (request,response,next)=>{
    const user = await User.findByIdAndUpdate(request.params.id,{
        name:request.body.name,
        email:request.body.email,
        avatar:request.body.avatar
    },{new:true});
    if(!user){
        return next(new AppError('invalid user',403));
    }
    response.status(200).json({
        status:'success',
        data:{
            user
        }
    })
});

exports.changePassword = catchAsync(async (request,response,next)=>{
    const user = await User.findByIdAndUpdate(request.params.id,{
        password:request.body.password,
        passwordChangeAt:Date.now(),
    },{new:true});
    if(!user){
        return next(new AppError('invalid user',403));
    }
    response.status(200).json({
        status:'success',
        message:'password changed successfully'
    })
})

exports.deleteUser = catchAsync(async (request,response,next)=>{
    const user = await User.findByIdAndDelete(request.params.id);
    if(!user){
        return next(new AppError('invalid user',403));
    }
    response.status(200).json({
        status:'success',
        message:'deleted successfully',
        data:null
    })
});