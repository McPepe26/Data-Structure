const express = require('express');
const router = express.Router();
const userController = require('../Controllers/UserController');
const { verifyToken } = require('../Middlewares/authToken');

// /api/user/

router.post('/login', userController.login);
router.get('/token', verifyToken, userController.loginWithToken);
router.post('/', userController.createUser);

module.exports = router;