const express = require('express');
const router = express.Router();
const { body,validationResult } = require('express-validator');
const user = require('../controllers/user.controller')
const authorization = require('../middlewares/auth.middleware')

// Validation middleware
const validateRegister = [
    body('email')
        .isEmail()
        .withMessage('Invalid email address'),
    body('fullName.firstName')
        .isLength({ min: 3 })
        .withMessage('First name must be at least 3 characters long'),
    body('password')
        .isLength({ min: 6 })
        .withMessage('Password must be at least 6 characters long'),
];

// Route handler
router.post('/register', validateRegister, (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    // Call the controller if validation passes
    user.registerUser(req, res, next);
});

const validateLogin = [
    body('email').isEmail().withMessage("Invalid email address"),
    body('password').isLength({ min: 6 }).withMessage("password must be atleast 6 charactors.")
]

router.post('/login', validateLogin, (req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    user.LoginUser(req, res, next);
})

router.get('/profile',authorization.authorizedUser, user.getUserProfile)

router.get('/logout', authorization.authorizedUser, user.logoutUser)

module.exports = router;