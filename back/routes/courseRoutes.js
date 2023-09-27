const express = require('express');
const courseController = require('../controllers/courseController');
// const { isAuthenticated } = require('../middleware/authentication.middleware');

const router = express.Router();

router.post('/create', courseController.createCourse);
router.get('/getCourse/:id', courseController.getCourse);
router.get('/getAllCourses', courseController.getAllCourses);
router.put('/editCourse/:id', courseController.editCourse);
router.delete('/deleteCourse/:id', courseController.deleteCourse);
router.get('/getTeacherCourses/:id', courseController.getTeacherCourses);

router.post('/subscribe/', courseController.subscribeToCourse);
router.get('/getEnrolledCourses/:id', courseController.getEnrolledCourses);

module.exports = router;
