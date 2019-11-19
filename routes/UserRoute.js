const express = require('express');
const JoiValidator = require('../middlewares/validator');
const UserController = require('../controllers/UserController');
const {RegisterUserValidator, LoginUserValidator} = require('../validations/UserValidation')
const AuthMiddleWare = require('../middlewares/auth');
const router = express.Router();

router.post('/register', JoiValidator(RegisterUserValidator), UserController.RegisterUser);
router.post('/login', JoiValidator(LoginUserValidator), UserController.LoginUser)
router.get('/profile', AuthMiddleWare, UserController.UserProfile)
module.exports = router;