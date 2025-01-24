const userModel = require('../models/user.model');

const createUser = async ({
    firstName, lastName, email, password
}) => {
    if (!firstName || !email || !password) {
        throw new Error("All fields are required");
    }
    const user = userModel.create({
        fullName: {
            firstName,
            lastName
        },
        email,
        password
    })

    return user;
}

const loginUser = async ({
    email
}) => {

    console.log("dxs ", email)
    if (!email) {
        throw new Error("All fields are required");
    }
    const user = userModel.findOne({
        email
    })
    return user;
}

module.exports = {
    createUser,
    loginUser,
}