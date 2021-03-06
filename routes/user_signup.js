// =============================================
// DEPENDENCIES
// =============================================
const router = require("express")();
const User = require("../schema").User;
const isEmail = require('validator/lib/isEmail');
const toEmail = require('../helpers/toEmail');

// =============================================
// GET - signup form
// =============================================
router.get("/signup", (req, res) => {
    if (req.cookies.auth) {
        req.flash('error', 'You are already logged in')
        return res.redirect('/blogs')
    }

    res.render('signup', { session: req.cookies.auth })
});

// =============================================
// POST - process sign up
// =============================================
router.post("/signup", async (req, res) => {
    try {
        const username = req.sanitize(req.body.username);
        const email = req.sanitize(req.body.email);
        const password = req.sanitize(req.body.password);
        const confirmpassword = req.sanitize(req.body.confirmpassword);

        if (!isEmail(email)) {
            throw new Error('Please provide a valid email address')
        }

        if (username.length > 20) {
            throw new Error('Usernames should only be at 20 characters maximum')
        }

        if (password.length < 8) {
            throw new Error('Please provide a min. of 8 characters for your password')
        }

        if (confirmpassword !== password) {
            throw new Error("Passwords doesn't match")
        }

        const newUser = await User.create({ username, email, password })

        const newUserToken = await newUser.generateToken('dontExpire');

        await toEmail(
            email,
            'Blogapp-v1 Confirm Account',
            `Please clink this link to confirm your email:

                http://${req.headers.host}/confirm?email=${email}&token=${newUserToken}
            `
        )

        req.flash('success', `Success!, Now, please confirm your email so you can login`);
        res.redirect('/signup')
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