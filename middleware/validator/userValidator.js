const {query,param,body} = require('express-validator');
const bcrypt = require('bcrypt');
const User = require('../../models/userModel');

module.exports.changePasswordValidator = [
    param("id")
    .notEmpty()
    .withMessage("please enter your id ")
    .isMongoId()
    .withMessage("id should be mongo id "),
    body('currentPassword').notEmpty().withMessage('please enter your current password'),
    body('password').notEmpty().withMessage('please enter your new password').custom(async (password,{req})=>{
        const user = await User.findById(request.params.id);
        if(!user){
            throw new Error('user not found');
        }
        const isMatch = await bcrypt.compare(request.body.currentPassword,user.password);
        if(!isMatch){
            throw new Error('current password is incorrect');
        }
        if(password !== confirmPassword){
            throw new Error('passwords do not match');
        }
        return true;
    })
]