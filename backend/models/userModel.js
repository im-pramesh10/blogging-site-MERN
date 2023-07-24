const mongoose = require("mongoose")
const bcrypt = require('bcrypt')

const userSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    username: {
        type: String,
        unique: true,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true
    },
    refreshToken: {
        type: String
    },
    createdAt: {
        type: Date,
        immutable: true, // not changeable
        default: () => Date.now()
    }
})

userSchema.pre('save', async function (next) {
    const user = this;

    // If the password is not modified, move on to the next middleware
    if (! user.isModified('password')) {
        return next();
    }

    try { // Generate a salt and hash the password with the salt
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(user.password, salt);

        // Replace the user's password with the hashed password
        user.password = hashedPassword;
        next();
    } catch (error) {
        return next(error);
    }
});


exports.User = mongoose.model("User", userSchema)
