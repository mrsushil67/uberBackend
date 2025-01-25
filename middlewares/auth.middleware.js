const userModel = require("../models/user.model");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const authorizedUser = async (req, res, next) => {
    const token = req.cookies.token || req.headers.authorization.split(' ')[1];
    console.log(token)
    try {
        if (!token) {
            return res.status(401).json({ message : " ye Unauthorized" });
        }
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        console.log(decodedToken)

        const user = await userModel.findById(decodedToken._id);
        req.user = user;
        return next();
    } catch (error) {
        return res.status(401).json({ message : " ab Unauthorized" });
    }
}

module.exports = {
    authorizedUser,
}