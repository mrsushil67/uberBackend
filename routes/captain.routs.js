const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const captain = require('../controllers/captain.controller');

// Validation middleware
const validateRegister = [
    body('fullName.firstName')
        .isLength({ min: 3 })
        .withMessage('First name must be at least 3 characters long'),
    body('email')
        .isEmail()
        .withMessage('Invalid email'),
    body('password')
        .isLength({ min: 6 })
        .withMessage('Password must be at least 6 characters long'),
    body('vehicle.vehicleType')
        .isLength({ min: 2 })
        .withMessage('Vehicle type is required'),
    body('vehicle.color')
        .isLength({ min: 2 })
        .withMessage('Vehicle color is required'),
    body('vehicle.plate')
        .isLength({ min: 2 })
        .withMessage('Vehicle plate is required'),
    body('vehicle.capacity')
        .isLength({ min: 1 })
        .withMessage('Vehicle capacity is required'),
];

// Route handler
router.post('/register', validateRegister, (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    // Call the controller if validation passes
    captain.registerCaptain(req, res, next);
});

module.exports = router;
