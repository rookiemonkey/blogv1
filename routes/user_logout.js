// =============================================
// DEPENDENCIES
// =============================================
const router = require("express")();
const isLoggedIn = require('../middlewares/isLoggedIn');

// =============================================
// GET - process logout
// =============================================
router.get("/logout", isLoggedIn, (req, res) => {
    req.flash('success', `Succesfully logged out`);
    res.cookie('auth', undefined, { expires: new Date(Date.now() + 10 * 1000) })
    res.redirect('/blogs')
});

// =============================================
// EXPORT
// =============================================
module.exports = router;