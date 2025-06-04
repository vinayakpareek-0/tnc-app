const express = require('express');
const router = express.Router();
const captainController = require('../controllers/captain.controller');
const {body}=  require('express-validator');
const auth = require('../middlewares/auth.middleware').authCaptain;

router.post("/register",[
    body("fullname.firstName").isLength({ min: 3 }).withMessage("First name is required"),
    body("fullname.lastName").isLength({ min: 3 }).withMessage("Last name is required"),
    body("email").isEmail().withMessage("Invalid email format"),
    body("password").isLength({ min: 6 }).withMessage("Password must be at least 6 characters long"),
    body("vehicle.color").isLength({ min: 3 }).withMessage("Vehicle color is required"),
    body("vehicle.plate").isLength({ min: 3 }).withMessage("Vehicle plate is required"),
    body("vehicle.capacity").isNumeric().withMessage("Vehicle capacity must be a number"),
    body("vehicle.vehicleType").isIn(['car', 'bike', 'auto']).withMessage("Invalid vehicle type"),
    body("location.lat").isNumeric().withMessage("Latitude must be a number"),
    body("location.lng").isNumeric().withMessage("Longitude must be a number")
], captainController.registerCaptain
)

router.post("/login", [
    body("email").isEmail().withMessage("Invalid email format"),
    body("password").isLength({ min: 6 }).withMessage("Password must be at least 6 characters long")
], captainController.loginCaptain);

 router.get("/profile", auth ,  captainController.getCaptainProfile);

router.get("/logout", auth, captainController.logoutCaptain);


module.exports = router;

