const userModel = require('../models/user.model')
const userService = require('../services/user.service')
const { validationResult } = require('express-validator')
const blacklistTokenModel = require('../models/blacklistToken.model')

const registerUser = async (req, res, next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ error: errors.array() });
    }

    const { fullName, email, password } = req.body;

    const isUserAlready = await userModel.findOne({ email });
    if(isUserAlready){
        return res.status(400).json({ message : "user Already Exist"})
    }
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

    res.cookie('token', token);
    res.status(200).json({ token, user })
}

const getUserProfile = async (req, res, next) => {
    res.status(200).json(req.user);
}

const logoutUser = async (req, res, next) => {
    res.clearCookie('token');

    const token = req.cookies.token || req.headers.authorization.split(' ')[1];

    await blacklistTokenModel.create({ token });

    res.status(200).json({ message: "user logged out" });
}

module.exports = {
    registerUser,
    LoginUser,
    getUserProfile,
    logoutUser,
}