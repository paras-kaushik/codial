const express = require('express');

const router = express.Router();
const passport = require('passport');
const postsApi = require("../../../controllers/api/v1/posts_api");


router.get('/', postsApi.index);
router.post('/create',passport.authenticate('jwt', {session: false}),postsApi.create);
router.delete('/:id', passport.authenticate('jwt', {session: false}), postsApi.destroy);
// session is false as we dont want session cookies to be generated
// via this middleware we handleed authentication - but not authorization -which we handle in controller action

module.exports = router;
