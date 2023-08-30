const express = require('express');
const userController = require('../controllers/userController');
const { validateCreate, validateLogin, validateEdit } = require('../validators/user.validator');
const { validateResults } = require('../helpers/validateHelpers');
const { isAuthenticated } = require('../middleware/authentication.middleware');

const router = express.Router();

router.post('/create', validateCreate, validateResults, userController.createUser);
router.post('/login', validateLogin, validateResults, userController.loginUser);
router.put('/edit/:id', validateEdit, validateResults, isAuthenticated, userController.editUser);
router.delete('/deleteUser/:id', isAuthenticated, userController.deleteUserController);

module.exports = router;
