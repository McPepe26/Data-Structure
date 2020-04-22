const express = require('express');
const router = express.Router();
const TestController = require('../Controllers/TestController');
const { verifyToken } = require('../Middlewares/authToken');

// /api/test/

router.post('/create', verifyToken, TestController.createTest);
router.get('/teacher', verifyToken, TestController.getTeacherTest);
router.put('/edit', verifyToken, TestController.editTest);
router.delete('/:id', verifyToken, TestController.deleteTest);

module.exports = router;