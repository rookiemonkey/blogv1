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
    Post.findByIdAndDelete(req.params.id, (err) => {
        err ? console.log(err) : res.redirect("/");
    });
});

// =============================================
// EXPORT
// =============================================
module.exports = router;