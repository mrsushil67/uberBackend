const userModel = require('../models/user.model')
const userService = require('../services/user.service')
const { validationResult } = require('express-validator')

const registerUser = async (req, res, next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ error: errors.array() });
    }

    const { fullName, email, password } = req.body;
    const hashedPassword = await userModel.hashPassword(password);

    const user = await userService.createUser({
        firstName: fullName.firstName,
        lastName: fullName.lastName,
        email,
        password: hashedPassword,
    })

    const token = user.generatAuthToken();
    res.status(201).json({ token, user });
}

const LoginUser = async (req, res, next) => {

    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ error: errors.array() });
    }

    const { email, password } = req.body;
    const user = await userModel.findOne({ email }).select('+password');

    if (!user) {
        return res.status(401).json({ error: "Invalid email or password" });
    }

    const isMatched = await user.comparePassword(password)
    if (!isMatched) {
        return res.status(401).json({ error: "Invalid email or password" });
    }

    const token = user.generatAuthToken();
    res.status(200).json({ token, user })
}

module.exports = {
    registerUser,
    LoginUser,
}