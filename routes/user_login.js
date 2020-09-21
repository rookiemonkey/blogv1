// =============================================
// DEPENDENCIES
// =============================================
const router = require("express")();
const bcrypt = require('bcrypt');
const isEmail = require('validator/lib/isEmail');
const User = require("../schema").User;

// =============================================
// GET - login form
// =============================================
router.get("/login", (req, res) => {
    res.render('login', {
        session: req.cookies.auth
    })
});

// =============================================
// POST - process login
// =============================================
router.post("/login", async (req, res) => {
    try {
        const email = req.sanitize(req.body.email);
        const password = req.sanitize(req.body.password);

        if (!isEmail(email)) {
            throw new Error('Invalid Email/Password')
        }

        const [foundUser] = await User.find({ email });

        if (!foundUser.isEmailConfirmed) {
            throw new Error('Please check your email and confirm your account first')
        }

        const isVerified = await bcrypt.compare(password, foundUser.password);

        if (!isVerified) {
            throw new Error('Invalid Email/Password')
        }

        const authToken = await foundUser.generateToken();
        const authTokenOptions = {};

        authTokenOptions.expires = new Date(Date.now() + process.env.JWT_COOKIE_EXPIRE_TIME * 24 * 60 * 60 * 1000);
        authTokenOptions.httpOnly = true;

        if (process.env.NODE_ENV === 'production') {
            authTokenOptions.secure = true;
        }

        req.flash('success', `Welcome back! ${foundUser.username}`);
        res.cookie('auth', authToken, authTokenOptions)
        res.redirect('/blogs')
    }

    catch (error) {
        req.flash('error', `Something went wrong. ${error.message}`);
        res.redirect('/login')
    }
});

// =============================================
// EXPORT
// =============================================
module.exports = router;