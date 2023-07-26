
const {query,param,body} = require('express-validator');

module.exports.signupValidator = [
    body("name").notEmpty().withMessage('please enter your name').isString().withMessage('please enter your full name'),
    body("email").notEmpty().withMessage('please enter your email').isEmail().withMessage('please enter your email address'),
    body('password').notEmpty().withMessage('please enter your password').isStrongPassword().withMessage('your password should have *1$Mn').custom((password,{req})=>{
        if(password !== req.body.confirmPassowrd){
            throw new Error('password not match');
        }
        return true;
    }),
    body('confirmPassowrd').notEmpty().withMessage('please enter your confirm Passowrd')
];


module.exports.loginValidator = [
    body("email").notEmpty().withMessage('please enter your email').isEmail().withMessage('please enter your email address'),
    body('password').notEmpty().withMessage('please enter your password').isStrongPassword().withMessage('your password should have *1$Mn')
];