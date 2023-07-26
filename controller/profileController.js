const Profile = require('../models/profileSchema');
const User = require('../models/userModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');



exports.getProfile = catchAsync(async (request,response,next)=>{
    
    const profile = await Profile.findOne({user:request.user.id});
    if(!profile){
        return next(new AppError('there is no profile for this user',401));
    }
    response.status(200).json({
        status:'success',
        data:{
            profile
        }
    })
});

exports.createProfile = catchAsync(async (request,response,next)=>{
    if(!request.body.user) request.body.user = request.user._id;
    const profile = await Profile.create(request.body);

    response.status(200).json({
        status:'success',
        data:{
            profile
        }
    })
});
exports.getAllProfiles = catchAsync(async (request,response,next)=>{
    const profiles = await Profile.find();
    response.status(200).json({
        status:'success',
        data:{
            profiles
        }
    })
})

exports.updateProfile = catchAsync(async (request,response,next)=>{
    const profile = await Profile.findOne({user:request.user.id});
    profile.company = request.body.company;
    profile.website = request.body.website;
    profile.location = request.body.location;
    profile.status = request.body.status;
    profile.skills = request.body.skills;
    profile.bio = request.body.bio;
    profile.githubusername = request.body.githubusername;
    profile.experience = request.body.experience;
    profile.education = request.body.education;
    profile.social = request.body.social;

  // Save the updated profile to the database
  const updatedProfile = await profile.save();
  response.status(200).json({
    status: 'success',
    data: { profile: updatedProfile }
  });
    // if(!request.body.user) request.body.user = request.user._id;
    // const profile = await Profile.findByIdAndUpdate(request.params.id,request.body,{new:true });
    // if(!profile){
    //     return next(new AppError('there is no profile for this user',401));
    // }
    // response.status(200).json({
    //     status:'success',
    //     data:{
    //         profile
    //     }
    // })
});

exports.deleteProfile = catchAsync(async (request,response,next)=>{
    const profile = await Profile.findOne({user:request.user.id});
    if(!profile){
        return next(new AppError('there is no profile for this user',401));
    }
    await Profile.deleteOne({ user: request.user.id })
    response.status(200).json({
        status:'success',
        message:'deleted successfully',
        data:null
    })
})