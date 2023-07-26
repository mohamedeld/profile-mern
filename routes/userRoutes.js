const express = require('express');
const checkValidator = require('../middleware/checkValidator');
const {changePasswordValidator} = require('../middleware/validator/userValidator');
const userController= require('../controller/userController');
const authController = require('../controller/authController');

const router = express.Router();

router.use(authController.protect);

router.route('/').get(authController.allowedTo('admin'),checkValidator,userController.getAllUsers).post(authController.allowedTo('admin'),checkValidator,userController.createUser);

router.route('/:id/changePassword').put(checkValidator,userController.changePassword);

router.route('/:id').get(authController.allowedTo('admin'),checkValidator,userController.getUser).patch(authController.allowedTo('admin'),checkValidator,userController.updateUser).delete(authController.allowedTo('admin'),checkValidator,userController.deleteUser);
