// =============================================
// DEPENDENCIES
// =============================================
const express = require("express");
const router = express();
const database = require("../schema");
const moment = require("moment");
const Post = database.Post;

// =============================================
// READ - get a blog
// =============================================
router.get("/blogs/:id", (req, res) => {
    Post.findById({ _id: req.params.id }, (err, foundPost) => {
        if (err) {
            req.flash('error', 'Seems that we do not have that post. Please choose a different post to view');
            res.redirect("/blogs?page=1");
        } else {
            res.render("getBlog", { foundPost: foundPost, moment: moment });
        }
    });
});

// =============================================
// EXPORT
// =============================================
module.exports = router;