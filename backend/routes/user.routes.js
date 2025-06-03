const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');
const authMiddleware = require('../middlewares/auth.middleware');


const { body } = require("express-validator");

router.post("/register",[
    body("fullname.firstName").isLength({ min: 3 }).withMessage("First name is required"),
    body("fullname.lastName").isLength({ min: 3 }).withMessage("Last name is required"),
    body("email").isEmail().withMessage("Invalid email format"),
    body("password").isLength({ min: 6 }).withMessage("Password must be at least 6 characters long")
], userController.registerUser);

router.post("/login",[
    body("email").isEmail().withMessage("Invalid email format"),
    body("password").isLength({ min: 6 }).withMessage("Password must be at least 6 characters long")
], userController.loginUser);

router.get("/profile",authMiddleware.authUser , userController.getUserProfile)

router.get("/logout", authMiddleware.authUser, userController.logoutUser);

module.exports = router;