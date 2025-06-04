const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');



const captainSchema = new mongoose.Schema({
    fullname: {
        firstName: {
            type: String,
            required: true,
            minlength: [3, 'First name must be at least 3 characters long'],
            maxlength: [50, 'First name must be at most 50 characters long'],
            trim: true
        },
        lastName: {
            type: String,
            minlength: [3, 'Last name must be at least 3 characters long'],
            maxlength: [50, 'Last name must be at most 50 characters long'],
            trim: true
        }
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: [5, 'Email must be at least 5 characters long'],
        lowercase: true, 
        match: [/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, 'Please fill a valid email address'] // Basic email validation
    },
    password: {
        type: String,
        required: true,
        select: false // Exclude password from queries by default
    },
    socketId: {
        type: String,
        default: null
    },
    status: {
        type: String,
        enum: ['active', 'inactive'],
        default: 'inactive'
    },
    vehicle:{
        color:{
            type: String,
            required: true,
            minlength: [3, 'Vehicle color must be at least 3 characters long']
        },
        plate:{
            type: String,
            required: true,
            unique: true,
            minlength: [3, 'Vehicle plate must be at least 3 characters long'],
            maxlength: [8, 'Vehicle plate must be at most 8 characters long'],
            trim: true
        },
        capacity: {
            type: Number,
            required: true,
            min: [1, 'Vehicle capacity must be at least 1'],
            max: [7, 'Vehicle capacity must be at most 7']
        },
        vehicleType: {
            type: String,
            required: true,
            enum: ['car', 'bike', 'auto'], // Example vehicle types
            trim: true
        }
    },
    location: {
        lat: {
            type: Number,
            min: -90,
            max: 90
        },
        lng: {
            type: Number,
            min: -180,
            max: 180
        }
    },

});

captainSchema.methods.generateAuthToken = async function () {
    const token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET, {
        expiresIn: '24h' // Token expiration time
    });
    return token;
}

captainSchema.methods.comparePassword = async function (candidatePassword) {
    const isMatch = await bcrypt.compare(candidatePassword, this.password);
    return isMatch;
}

captainSchema.statics.hashPassword = async function (password) {
    const salt = await bcrypt.genSalt(10); // Generate a salt with 10 rounds
    const hashedPassword = await bcrypt.hash(password, salt); // Hash the password with the salt
    return hashedPassword; // Return the hashed password
}

captainModel= mongoose.model('Captain', captainSchema);
module.exports =captainModel; 