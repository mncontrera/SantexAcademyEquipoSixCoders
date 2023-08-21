const express = require('express');
const userController = require('../controllers/userController');

const router = express.Router();

router.post('/create', userController.createUser);
router.post('/login', userController.loginUser);
router.put('/edit/:id', userController.editUser);

module.exports = router;
