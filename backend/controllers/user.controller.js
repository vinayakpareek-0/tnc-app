const userModel = require('../models/usermodel');
const userService = require('../services/user.service');
const { validationResult } = require('express-validator');
const blacklistTokenModel = require('../models/blacklistTokenmodel');

module.exports.registerUser = async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const { fullname, email, password } = req.body;
        const hashedPassword = await userModel.hashPassword(password);
        const user = await userService.createUser({
            firstname: fullname.firstName,
            lastname: fullname.lastName,
            email,
            password: hashedPassword
        });

        const token = await user.generateAuthToken();
res.status(201).json({
    message: "User registered successfully",
    user: {
        id: user._id,
        firstname: user.fullname.firstName,
        lastname: user.fullname.lastName,
        email: user.email
    },
    token
});
    } catch (error) {
        next(error);
    }
};
module.exports.loginUser = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;
    const user=await userModel.findOne({email}).select('+password');
    if (!user) {
        return res.status(401).json({ message: "Invalid email or password" });
    }
    const isMatch = await user.comparePassword(password, user.password);
    if (!isMatch) {
        return res.status(401).json({ message: "Invalid email or password" });
    }
    const token = await user.generateAuthToken();
    // Set the token in a cookie
    // Ensure you have cookie-parser middleware set up in your app

   res.cookie('token', token, {
    httpOnly: true,
    sameSite: 'lax', // or 'none' if using HTTPS and cross-site
    secure: false    // set to true if using HTTPS
});
    res.status(200).json({
        message: "Login successful",
        user: {
            id: user._id,
            firstname: user.fullname.firstName,
            lastname: user.fullname.lastName,
            email: user.email
        },
        token
    });
};

module.exports.getUserProfile = async (req, res, next) => {
    // Implement user profile retrieval logic here
    res.status(200).json({
        message: "User profile retrieved successfully",
        user: {
            id: req.user._id,
            firstname: req.user.fullname.firstName,
            lastname: req.user.fullname.lastName,
            email: req.user.email
        }
    });
  
}


module.exports.logoutUser = async (req, res, next) => {
    try {
        // Clear the token from the cookie
        res.clearCookie('token');
        const token= req.cookies.token || req.header('Authorization')?.replace('Bearer ', '');
        await blacklistTokenModel.create({ token });
        res.status(200).json({ message: "Logout successful" });
    } catch (error) {
        next(error);
    }
};