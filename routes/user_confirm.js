// =============================================
// DEPENDENCIES
// =============================================
const router = require("express")();
const jwt = require('jsonwebtoken');
const isEmail = require('validator/lib/isEmail');
const User = require("../schema").User;

// =============================================
// POST - process email confirmation
// =============================================
router.post("/confirm", async (req, res) => {
    try {
        const { email, token } = req.query;

        if (!isEmail(email)) {
            throw new Error('Please provide a valid email address')
        }

        const isVerified = await jwt.verify(token, process.env.JWT_SECRET_KEY);

        if (!isVerified) {
            throw new Error('Invalid Token');
        }

        const foundUser = await User.find({ email });

        if (!foundUser) {
            throw new Error('No User Found');
        }

        foundUser.isEmailConfirmed = true;
        await foundUser.save();

        req.flash('success', `Success!, Please login and start blogging`);
        res.redirect('/login')
    }

    catch (error) {
        req.flash('error', `Something went wrong. ${error.message}`);
        res.redirect('/signup')
    }
});

// =============================================
// EXPORT
// =============================================
module.exports = router;