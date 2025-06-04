const captainModel = require('../models/captainmodel');
const captainService = require('../services/captain.service');
const { validationResult } = require('express-validator');
const blackModel = require('../models/blacklistTokenmodel');




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

    res.cookie('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 24 * 60 * 60 * 1000
    });

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

module.exports.loginCaptain = async (req, res, next) => {

    
    if (!req.body) {
        return res.status(400).json({ message: "Request body is missing" });
    }

    const errors = validationResult(req);
    // console.log(req.body.email, req.body.password);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;


    // Explicitly select password
    const captain = await captainModel.findOne({ email }).select('+password');
    if (!captain) {
        return res.status(400).json({ message: "Invalid email or password" });
    }

    const isMatch = await captain.comparePassword(password);
    if (!isMatch) {
        return res.status(400).json({ message: "Invalid email or password" });
    }

    const token = await captain.generateAuthToken();

    res.cookie('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 24 * 60 * 60 * 1000
    });

    res.status(200).json({
        message: "Captain logged in successfully",
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
}

module.exports.getCaptainProfile = async (req, res, next) => {
    res.status(200).json({  
        message: "Captain profile retrieved successfully",
        captain: {
            id: req.captain._id,
            fullname: {
                firstName: req.captain.fullname.firstName,
                lastName: req.captain.fullname.lastName
            },
            email: req.captain.email,
            vehicle: {
                color: req.captain.vehicle.color,
                plate: req.captain.vehicle.plate,
                capacity: req.captain.vehicle.capacity,
                vehicleType: req.captain.vehicle.vehicleType
            }
        }
    });

}



module.exports.logoutCaptain = async (req, res, next) => {
    const token = req.cookies.token || req.header('Authorization')?.replace('Bearer ', '');
    if (!token) {
        return res.status(400).json({ message: "No token provided" });
    }

    await blackModel.create({ token }); // Add the token to the blacklist

    res.clearCookie('token'); // Clear the cookie
    res.status(200).json({ message: "Captain logged out successfully" });

}
