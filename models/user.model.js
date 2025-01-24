const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    fullName: {
        firstName: {
            type: String,
            required: true,
            minLen: [3, 'firstName required atleast 3 characters']
        },
        lastName: {
            type: String,
            minLen: [2, 'lastName required atleast 2 characters']
        }
    },
    email: {
        type: String,
        required: true,
        unique: true,
        minLen: [5, 'email required atleast 5 characters']
    },
    password: {
        type: String,
        required: true,
        select: false,
    },
    socketId: {
        type: String,
        required: true,
    }
})

userSchema.method.generatAuthToken = function () {
    const token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET)
    return token;
}

userSchema.method.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
}

userSchema.statics.hashPassword = async function (password) {
    return await bcrypt.hash(password, 10);
}

const userModel = mongoose.model('user', userSchema)

module.exports = userModel;