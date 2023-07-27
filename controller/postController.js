const Post = require('../models/postModel');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

exports.createPost = catchAsync(async(request,response,next)=>{
    if(!request.body.user) request.body.user = request.user.id;
    if(!request.body.name) request.body.name = request.user.name;
    if(!request.body.avatar) request.body.avatar = request.user.avatar;
    const post = await Post.create(request.body);
    response.status(200).json({
        status:'success',
        data:{
            post
        }
    })
});
exports.getPosts = catchAsync(async(request,response,next)=>{
    const posts = await Post.find();
    response.status(200).json({
        status:'success',
        data:{
            posts
        }
    })
});

exports.getPost = catchAsync(async(request,response,next)=>{
    const post = await Post.findById(request.params.id);
    if(!post){
        return next(new AppError('not found this post',404));
    }
    response.status(200).json({
        status:'success',
        data:{
            post
        }
    })
});

exports.addLike = catchAsync(async (request,response,next)=>{
    const post = await Post.findById(request.params.id);
    if(!post){
        return next(new AppError('post is not found'),404);
    }
    if(post.likes.filter(like => like.user.toString() === request.user.id).length > 0){
        return next(new AppError('post already like',404));
    }
    post.likes.unshift({user:request.user.id});
    await post.save();
    response.status(200).json({
        status:'success',
        message:'liked',
        data:post.likes
    })
});

exports.unlike = catchAsync(async (request,response,next)=>{
    const post = await Post.findById(request.params.id);
    if(!post){
        return next(new AppError('post is not found'),404);
    }
    if(post.likes.filter(like=>like.user.toString() === request.user.id).length === 0){
        return next(new AppError('post has not been liked',404));
    }

    const removeIndex = post.likes.map(like=> like.user.toString()).indexOf(request.user._id);
    post.likes.splice(removeIndex,1);
    await post.save();
    response.status(200).json({
        status:'success',
        message:'remove the like',
        data:post.likes
    })

});

exports.addComment = catchAsync(async(request,response,next)=>{
    const post = await Post.findById(request.params.id);
    if(!post){
        return next(new AppError('post is not found'),404);
    }
    post.comments.unshift({user:request.user.id,text:request.body.text});
    await post.save();
    response.status(200).json({
        status:'success',
        message:'commented',
        data:post.comments
    })
});

exports.removeComment = catchAsync(async (request,response,next)=>{
    const post = await Post.findById(request.params.id);
    if(!post){
        return next(new AppError('post is not found'),404);
    }
    if(post.comments.filter(comment=> comment.user.toString() === request.user.id).length === 0){
        return next(new AppError('post has not been commented',404));
    }
    const removeIndex = post.comments.map(comment=> comment.user.toString()).indexOf(request.user.id);
    post.comments.splice(removeIndex, 1);
    await post.save();
    response.status(200).json({
        status:'success',
        message:'removed the comment',
        data:post.comments
    })

});

exports.updatePost = catchAsync(async(request,response,next)=>{
    if(!request.body.user) request.body.user = request.user.id;
    if(!request.body.name) request.body.name = request.user.name;
    if(!request.body.avatar) request.body.avatar = request.user.avatar;
    const post = await Post.findByIdAndUpdate(request.params.id,request.body,{new:true});
    if(!post){
        return next(new AppError('not found this post',404));
    }
    if(post.user.toString() !== request.user.id){
        return next(new AppError('user is not authorized',403));
    }
    response.status(200).json({
        status:'success',
        data:{
            post
        }
    })
});

exports.deletePost = catchAsync(async(request,response,next)=>{
    const post = await Post.findByIdAndDelete(request.params.id);
    if(!post){
        return next(new AppError('not found this post',404));
    }
    response.status(200).json({
        status:'success',
        message:'deleted successfully',
        data:null
    })
});