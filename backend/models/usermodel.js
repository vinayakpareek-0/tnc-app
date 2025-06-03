const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const userSchema= new mongoose.Schema({
    fullname: {
        firstName:{
            type: String,
            required: true,
            minlength: [3,'First name must be at least 3 characters long'],
            maxlength: [50,'First name must be at most 50 characters long'],
            trim: true
        },
        lastName:{
            type: String,
            minlength: [3,'last name must be at least 3 characters long'],
            maxlength: [50,'last name must be at most 50 characters long'],
            trim: true
        }
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: [5, 'Email must be at least 5 characters long'],
    },
    password: {
        type: String,
        required: true,
        select: false, // Exclude password from queries by default
    },
    socketId: {
        type: String,
        default: null
    },

});

userSchema.methods.generateAuthToken = async function () {
    const expiresIn = '24h';
    const token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET, {
            expiresIn: '24h'// Token expiration time
    });
    return token;
}
userSchema.methods.comparePassword = async function (candidatePassword) {
    const isMatch = await bcrypt.compare(candidatePassword, this.password);
    return isMatch;
}

userSchema.statics.hashPassword = async function (password) {
    const salt = await bcrypt.genSalt(10); // Generate a salt with 10 rounds
    const hashedPassword = await bcrypt.hash(password, salt); // Hash the password with the salt
    return hashedPassword; // Return the hashed password
}
const userModel = mongoose.model('User', userSchema);
module.exports = userModel; // Export the user model for use in other parts of the application