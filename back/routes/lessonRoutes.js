const express = require('express');
const lessonController = require('../controllers/lessonController');
// const { isAuthenticated } = require('../middleware/authentication.middleware');

const router = express.Router();

router.post('/create', lessonController.createLesson);

module.exports = router;
