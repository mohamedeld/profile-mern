
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const User =require('../models/userModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

exports.signup = catchAsync(async (request,response,next)=>{
    const userWasFound = await User.findOne({email:request.body.email});
    if(userWasFound){
        return next(new AppError('user email was found',403));
    }
    const user = await User.create(request.body);
    const token = jwt.sign({id:user._id},process.env.JWT_SERCERT_KEY,{
        expiresIn:process.env.JWT_EXPIRES_IN
    });
    response.status(200).json({
        stauts:'success',
        data:{
            user,
            token
        }
    })
});

exports.login = catchAsync(async (request,response,next)=>{
    const user = await User.findOne({email:request.body.email});
    if(!user){
        return next(new AppError('Invalid credentials',401));
    }
    const correctPassword = await bcrypt.compare(request.body.password,user.password);
    if(!correctPassword){
        return next(new AppError('Invalid credentials',401));
    }
    const token = jwt.sign({id:user._id},process.env.JWT_SERCERT_KEY,{
        expiresIn:process.env.JWT_EXPIRES_IN
    });
    response.status(200).json({
        status:'success',
        message:'login successfully',
        data:{
            user,
            token
        }
    })
});

exports.protect = catchAsync(async (request,response,next)=>{
    let token;
    if(request.headers.authorization && request.headers.authorization.startsWith('Bearer ')){
        token = request.headers.authorization.split(' ')[1];
    }
    if(!token){
        return next(new AppError('No token provided',401));
    }
    const decoded = jwt.verify(token,process.env.JWT_SERCERT_KEY);
    if(!decoded){
        return next(new AppError('Invalid token',401));
    }
    const currentUser = await User.findById(decoded.id);
    if(!currentUser){
        return next(new AppError('Invalid token',401));
    }
    if(currentUser.passwordChangeAt){
        const convertedPassword = parseInt(currentUser.passwordChangeAt.getTime() /1000,10);
        if(convertedPassword > decoded.iat){
            response.status(401).json({message:'the user change his password please login again'})
        }
    }
    request.user = currentUser;
    next();
});

exports.allowedTo = (...roles)=>{
    return (request,respones,next)=>{
        if(!roles.includes(request.user.role)){
            return next(new AppError('you dont have permission for this role',403));
        };
        next();
    }
}


