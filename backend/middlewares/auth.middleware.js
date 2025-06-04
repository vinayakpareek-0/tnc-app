const userModel = require('../models/usermodel');
const captainModel = require('../models/captainmodel'); // <-- Add this line
const jwt = require('jsonwebtoken');
const blackModel = require('../models/blacklistTokenmodel');

module.exports.authUser = async (req, res, next) => {
    // Fix typo here
    const token = req.cookies.token || req.header('Authorization')?.replace('Bearer ', '');
    if (!token) {
        return res.status(401).json({ message: 'Authentication token is missing' });
    }

    const isBlackListed = await blackModel.findOne({ token: token });
    if(isBlackListed){
        return res.status(401).json({ message: 'Invalid authentication token' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        // Use _id, not id
        const user = await userModel.findById(decoded._id);
        if (!user) {
            return res.status(401).json({ message: 'Invalid authentication token' });
        }
        req.user = user;
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Invalid authentication token' });
    }
}

module.exports.authCaptain = async (req, res, next) => {
    // Fix typo here
    const token = req.cookies.token || req.header('Authorization')?.replace('Bearer ', '');
    if (!token) {
        return res.status(401).json({ message: 'Authentication token is missing' });
    }

    const isBlackListed = await blackModel.findOne({ token: token });
    if(isBlackListed){
        return res.status(401).json({ message: 'Invalid authentication token' });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        // Use _id, not id
        const captain = await captainModel.findById(decoded._id);
        if (!captain) {
            return res.status(401).json({ message: 'Invalid authentication token' });
        }
        req.captain = captain;
        next();     
}   catch (error) {
        return res.status(401).json({ message: 'Invalid authentication token' });
    }
}