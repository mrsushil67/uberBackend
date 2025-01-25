const captainModel = require('../models/captain.model');
const captainService = require('../services/captain.service');
const { validationResult } = require('express-validator');

const registerCaptain = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { fullName, email, password, vehicle } = req.body;

    const isCaptainAlready = await captainModel.findOne({ email });
    if(isCaptainAlready){
        return res.status(400).json({ message : "captain already exist."});
    }

    const hashedPassword = await captainModel.hashPassword(password);

    const captain = await captainService.createCaptain({
        firstName: fullName.firstName,
        lastName: fullName.lastName,
        email,
        password: hashedPassword,
        vehicleType: vehicle.vehicleType,
        color: vehicle.color,
        plate: vehicle.plate,
        capacity: vehicle.capacity
    })

    const token = captain.generatAuthToken();

    res.status(201).json({ token, captain })
}

const loginCaptain = async(req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({ errors:errors.array()})
    }

    const {email, password} = req.body;

    const captain = await captainModel.findOne({ email}).select('+password')

    if(!captain){
        return res.status(401).json({ message : 'Invalid email or password'});
    }

    const isMatched = await captain.comparePassword(password);

    if(!isMatched){
        return res.status(401).json({error: "Invalid email or password" });
    }

    const token = captain.generatAuthToken();

    res.cookie('token', token);
    res.status(200).json({ token, captain })
}

module.exports = {
    registerCaptain,
    loginCaptain,
}