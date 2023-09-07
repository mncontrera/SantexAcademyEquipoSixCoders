const express = require('express');
const courseController = require('../controllers/courseController');
// const { isAuthenticated } = require('../middleware/authentication.middleware');

const router = express.Router();

router.post('/create', courseController.createCourse);

module.exports = router;
