const express =require('express');
const checkValidator = require('../middleware/checkValidator.js');
const profileController = require('../controller/profileController');
const authController = require('../controller/authController');

const router = express.Router();
router.use(authController.protect)
router.route('/').get(authController.allowedTo('admin'),profileController.getAllProfiles).post(authController.allowedTo('user'),profileController.createProfile).patch(authController.allowedTo('user'),checkValidator,profileController.updateProfile).delete(authController.allowedTo('user'),checkValidator,profileController.deleteProfile);

router.route('/getMe').get(authController.allowedTo('user'),checkValidator,profileController.getProfile)
module.exports = router;