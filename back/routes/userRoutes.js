const express = require('express');
const userController = require('../controllers/userController');
// const { isAuthenticated } = require('../middleware/authentication.middleware');

const router = express.Router();

router.post('/create', userController.createUser);
router.post('/login', userController.loginUser);
router.put('/edit/:id', userController.editUser);
router.delete('/deleteUser/:id', userController.deleteUser);
router.get('/profile/:id', userController.userProfile);

router.post('/sendEmail', userController.sendEmail);

module.exports = router;
