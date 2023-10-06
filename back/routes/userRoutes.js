const express = require('express');
const userController = require('../controllers/userController');
const { isAuthenticated } = require('../middleware/authentication.middleware');

const router = express.Router();

router.post('/create', userController.createUser);
router.post('/login', userController.loginUser);
router.put('/edit/:id', isAuthenticated, userController.editUser);
router.delete('/deleteUser/:id', isAuthenticated, userController.deleteUser);
router.get('/profile/:id', isAuthenticated, userController.userProfile);

router.post('/sendEmail', userController.sendEmail);

module.exports = router;
