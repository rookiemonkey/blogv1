// =============================================
// DEPENDENCIES
// =============================================
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// =============================================
// POST SCHEMA
// =============================================
const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    token: {
        type: String,
        default: '',
    },
    isEmailConfirmed: {
        type: Boolean,
        default: false
    },
    created: { type: Date, default: Date() }
});

// hash the password before saving to the database
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) { return next(); }

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

// generate a token for a user
userSchema.methods.generateToken = async function (dontExpire) {
    if (dontExpire) {
        const token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET_KEY)
        this.token = token;
        await this.save();
        return token;
    }

    else {
        const token = jwt
            .sign(
                { _id: this._id },
                process.env.JWT_SECRET_KEY,
                { expiresIn: process.env.JWT_EXPIRE_TIME }
            );
        this.token = token;
        await this.save();
        return token;
    }
}

const User = mongoose.model("User", userSchema);


// =============================================
// EXPORT
// =============================================
module.exports = User;