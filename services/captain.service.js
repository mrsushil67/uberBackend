const captainModel = require('../models/captain.model');

const createCaptain = ({
    firstName, lastName, email, password, color, plate, vehicleType, capacity
}) => {
    if (!firstName || !email || !password || !color || !plate || !vehicleType || !capacity) {
        throw new Error('All fields are required');
    }
    const captain = captainModel.create({
        fullName: {
            firstName,
            lastName,
        },
        email,
        password,
        vehicle: {
            vehicleType,
            color,
            plate,
            capacity
        }
    })

    return captain;
}

module.exports = {
    createCaptain,
}