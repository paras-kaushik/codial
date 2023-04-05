const express = require('express');
const router = express.Router();
const passport = require('passport');

const postsController = require('../controllers/posts_controller');

router.post('/create', passport.checkAuthentication, postsController.create);// second level of check -first being at view level
router.get('/destroy/:id', passport.checkAuthentication, postsController.destroy);

module.exports = router;
