const express = require('express');
const lessonController = require('../controllers/lessonController');
// const { isAuthenticated } = require('../middleware/authentication.middleware');

const router = express.Router();

router.post('/create', lessonController.createLesson);
router.get('/getLesson', lessonController.getLesson);
router.get('/getAllLessons', lessonController.getAllLessons);
router.put('/editLesson', lessonController.editLesson);
router.delete('/deleteLesson', lessonController.deleteLesson);

module.exports = router;
