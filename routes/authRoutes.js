
const express = require('express');
const {signupValidator,loginValidator} =require('../middleware/validator/authValidator');
const authController = require('../controller/authController');
const checkValidator = require('../middleware/checkValidator');

const router = express.Router();

router.route('/signup').post(signupValidator,checkValidator,authController.signup);
router.route('/login').post(loginValidator,checkValidator,authController.login);

module.exports = router;