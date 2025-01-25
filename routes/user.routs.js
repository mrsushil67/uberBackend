const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const user = require('../controllers/user.controller')
const authorization = require('../middlewares/auth.middleware')

router.post('/register', [
    body('email').isEmail().withMessage('invalid email'),
    body('fullName.firstName').isLength({ min: 3 }).withMessage('first name is required'),
    body('password').isLength({ min: 6 }).withMessage('password must required'),
], user.registerUser)

router.post('/login', [
    body('email').isEmail().withMessage('invalid email'),
    body('password').isLength({ min: 6 }).withMessage("Password must be atleast 6 characters long"),
], user.LoginUser)

router.get('/profile',authorization.authorizedUser, user.getUserProfile)

router.get('/logout', authorization.authorizedUser, user.logoutUser)

module.exports = router;