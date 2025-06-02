const userModel = require('../models/usermodel');
const userService = require('../services/user.service');
const { validationResult } = require('express-validator');

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
                firstname: user.firstname,
                lastname: user.lastname,
                email: user.email
            },
            token
        });
    } catch (error) {
        next(error);
    }
};


