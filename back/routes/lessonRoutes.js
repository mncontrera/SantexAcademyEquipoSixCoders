const express = require('express');
const lessonController = require('../controllers/lessonController');
// const { isAuthenticated } = require('../middleware/authentication.middleware');

const router = express.Router();

router.post('/create', lessonController.createLesson);
router.get('/getLesson/:id', lessonController.getLesson);
router.get('/getAllLessons', lessonController.getAllLessons);
router.put('/editLesson/:id', lessonController.editLesson);
router.delete('/deleteLesson/:id', lessonController.deleteLesson);

router.put('/attendant', lessonController.attendedLesson);

module.exports = router;
