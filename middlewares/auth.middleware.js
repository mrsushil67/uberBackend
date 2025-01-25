const userModel = require("../models/user.model");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const blacklistTokenModel = require('../models/blacklistToken.model')

const authorizedUser = async (req, res, next) => {
    const token = req.cookies?.token || req.headers.authorization?.split(' ')[1];
    console.log(token)
    try {
        if (!token) {
            return res.status(401).json({ message : "a Unauthorized" });
        }

        const isBlacklistedToken = await blacklistTokenModel.findOne({ token : token })
        if(isBlacklistedToken){
            return res.status(401).json({ message : "b Unauthorized" });
        }
        
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        console.log(decodedToken)

        const user = await userModel.findById(decodedToken._id);
        req.user = user;
        return next();
    } catch (error) {
        return res.status(401).json({ message : "c Unauthorized" });
    }
}

module.exports = {
    authorizedUser,
}