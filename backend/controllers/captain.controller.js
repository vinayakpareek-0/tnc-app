const captainModel = require('../models/captainmodel');
const captainService = require('../services/captain.service');
const { validationResult } = require('express-validator');

module.exports.registerCaptain = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { fullname, email, password ,vehicle} = req.body;

    const doCaptainExists = await captainModel.findOne({ email });
    if (doCaptainExists) {
        return res.status(400).json({ message: "Captain already exists" });
    }

    const hashedPassword = await captainModel.hashPassword(password);

    const captain = await captainService.createCaptain({
        firstName: fullname.firstName,
        lastName: fullname.lastName,
        email,
        password: hashedPassword,
        color: vehicle.color,
        plate: vehicle.plate,
        capacity: vehicle.capacity,
        vehicleType: vehicle.vehicleType
    });
    const token = await captain.generateAuthToken();

    res.status(201).json({
        message: "Captain registered successfully",
        captain: {
            id: captain._id,
            fullname: {
                firstName: captain.fullname.firstName,
                lastName: captain.fullname.lastName
            },
            email: captain.email,
            vehicle: {
                color: captain.vehicle.color,
                plate: captain.vehicle.plate,
                capacity: captain.vehicle.capacity,
                vehicleType: captain.vehicle.vehicleType
            }
        },
        token
    });
};
