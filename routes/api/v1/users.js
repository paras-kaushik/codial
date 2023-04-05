const express = require('express');

const router = express.Router();
const usersApi = require('../../../controllers/api/v1/users_api');


router.post('/login', usersApi.createSession);
router.post('/signup', usersApi.signup);


module.exports = router;
