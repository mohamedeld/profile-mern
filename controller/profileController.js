const Profile = require('../models/profileModel');
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
  const updatedProfile = await profile.save();
  response.status(200).json({
    status: 'success',
    data: { profile: updatedProfile }
  });
    
});

exports.updateExperience = catchAsync(async (request,response,next)=>{
    const profile = await Profile.findOne({user:request.user.id});
   if(!profile){
       return next(new AppError('there is no profile for this user',401));
   }
   const {title,company,location,from,to,current,description} = request.body;
   const newExp = {title,company,location,from,to,current,description};
   
   profile.experience.unshift(newExp);
   await profile.save();
//    console.log(profile.experience)
   response.status(200).json({
    status:'success',
    message:'exdperience updated successfully',
    data:{
        profile
    }
   })
});

exports.deleteExperience = catchAsync(async(request,response,next)=>{
    const profile = await Profile.findOne({user:request.user.id});
    if(!profile){
        return next(new AppError('there is no profile for this user',401));
    }
    const removeIndex = profile.experience.map((item)=>item.id).indexOf(request.params.exp_id);
    profile.experience.splice(removeIndex,1);
    await profile.save();
    response.status(200).json({
        status:'success',
        message:'deleted successfully',
        data:{
            profile
        }
    })
});

exports.updateEducation = catchAsync(async(request,response,next)=>{
    const profile = await Profile.findOne({user:request.user.id});
    if(!profile){
        return next(new AppError('there is no profile for this user',401));
    }
    const {school,degree,fieldOfStudy,from,to,current,description} = request.body;
    const newEdu = {school,degree,fieldOfStudy,from,to,current,description};

    profile.education.unshift(newEdu);
    await profile.save();
    response.status(200).json({
     status:'success',
     message:'eduction updated successfully',
     data:{
        profile
     }
    })
});


exports.removeEducation = catchAsync(async(request,response,next)=>{
    const profile = await Profile.findOne({user:request.user.id});
    if(!profile){
        return next(new AppError('there is no profile for this user',401));
    }
    const removeIndex = profile.education.map(item=>item.id).indexOf(request.params.edu_id);
    profile.education.splice(removeIndex,1);
    await profile.save();
    response.status(200).json({
        status:'success',
        message:'deleted successfully',
        data:{
            profile
        }
    })
})

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