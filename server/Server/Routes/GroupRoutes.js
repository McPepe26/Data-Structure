const express = require('express');
const router = express.Router();
const groupController = require('../Controllers/GroupController');
const { verifyToken } = require('../Middlewares/authToken');

// /api/user/

router.get('/', verifyToken, groupController.getAllGroupsByUser);
router.post('/create', verifyToken, groupController.createGroup);
router.delete('/:id', verifyToken, groupController.deleteGroup);

module.exports = router;