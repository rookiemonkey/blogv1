// =============================================
// DEPENDENCIES
// =============================================
const express = require("express");
const router = express();
const database = require("../schema");
const isLoggedIn = require('../middlewares/isLoggedIn');
const Post = database.Post;

// =============================================
// DELETE - delete a blog
// =============================================
router.delete("/blogs/delete/:id", isLoggedIn, (req, res) => {
    Post.findById(req.params.id, (err, foundPost) => {
        foundPost.remove();
        if (err) {
            req.flash('error', `Something went wrong upon deleting '${foundPost.title}'. Please try again later`);
            res.redirect("/blogs?page=1");
        } else {
            req.flash('info', `${foundPost.title} was deleted successfully`);
            res.redirect("/blogs?page=1");
        }
    });
});

// =============================================
// EXPORT
// =============================================
module.exports = router;