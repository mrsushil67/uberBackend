const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const captainSchema = new mongoose.Schema({
    fullName: {
        firstName: {
            type: String,
            required: true,
            minLen: [3, "Atleast three charactor required"]
        },
        lastName: {
            type: String,
            minLen: [2, "Atleast two charactor required"]
        }
    },
    email: {
        type: String,
        required: true,
        unique: true,
        minLen: [5, "Atleast 5 charactor required"]
    },
    password: {
        type: String,
        required: true,
        select: false,
    },
    socketId: {
        type: String,
    },
    status: {
        type: String,
        enum: ['active', 'inactive'],
        default: 'inactive',
    },
    vehicle: {
        type: {
            type: String,
            required: true,
            enum: ['car', 'bike', 'auto']
        },
        color: {
            type: String,
            required: true,
        },
        plate: {
            type: String,
            required: true,
        },
        capacity: {
            type: Number,
            required: true,
        }
    },
    location: {
        latitude: {
            type: Number,
        },
        longitude: {
            type: Number,
        }
    }
})

captainSchema.methods.generatAuthToken = function () {
    const token = jwt.sign({_id : this._id, email: this.email},process.env.JWT_SECRET,{expiresIn : '24h'})
    return token;
}

captainSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
}

captainSchema.statics.hashPassword = async function (password) {
    return await bcrypt.hash(password, 10);
}

const captainModel = mongoose.model('captain', captainSchema)

module.exports = captainModel;