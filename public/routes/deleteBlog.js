// =============================================
// DEPENDENCIES
// =============================================
const express       = require("express");
const router        = express();
const database      = require("../schema");
const Post          = database.Post;

// =============================================
// DELETE - delete a blog
// =============================================
// DELETE ROUTE
router.delete("/blogs/delete/:id", (req, res) => {
    Post.findById(req.params.id, (err, foundPost) => {
        foundPost.remove();
        if(err) {
            req.flash('error', `Something went wrong upon deleting '${foundPost.title}'. Please try again later`);
            res.redirect("/blogs");
        } else {
            req.flash('info', `${foundPost.title} was deleted successfully`);
            res.redirect("/blogs");
        }
    });
});

// =============================================
// EXPORT
// =============================================
module.exports = router;