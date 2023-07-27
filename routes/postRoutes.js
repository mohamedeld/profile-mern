const express =require('express');
const postController =require('../controller/postController');
const checkValidator = require('../middleware/checkValidator');
const authController = require('../controller/authController');


const router =express.Router();
router.use(authController.protect,authController.allowedTo('user'));
router.route('/').get(checkValidator,postController.getPosts).post(checkValidator,postController.createPost);

router.route('/:id').get(checkValidator,postController.getPost).patch(checkValidator,postController.updatePost).delete(checkValidator,postController.deletePost);

router.route('/like/:id').put(checkValidator,postController.addLike);
router.route('/unlike/:id').delete(checkValidator,postController.unlike);

router.route('/comment/:id').put(checkValidator,postController.addComment);
router.route('/uncomment/:id').delete(checkValidator,postController.removeComment);
module.exports = router;