// =============================================
// DEPENDENCIES
// =============================================
const express = require("express");
const router = express();
const database = require("../schema");
const moment = require("moment");
const Post = database.Post;
const errorImage = require('../public/images/error-base64');

// =============================================
// INDEX - get all blogs
// =============================================
router.get('/', (req, res) => {
    res.redirect("/blogs?page=1");
});

router.get('/blogs', (req, res) => {
    const { page } = req.query
    let limit = 10
    let skip = limit * (parseInt(page) - 1)

    if (!page || !parseInt(page)) {
        Post.find({}, (err, foundBlogs) => {
            if (err) {
                req.flash('error', 'Something went wrong upon getting all the post from the databases');
                return res.redirect('/blogs');
            }

            res.render("getBlogs", {
                blogs: foundBlogs,
                moment: moment,
                next: 2,
                errorImage,
            });

        })
            .limit(limit)
            .skip(skip);
    }

    else {
        Post.find({}, (err, foundBlogs) => {
            if (err) {
                req.flash('error', 'Something went wrong upon getting all the post from the databases');
                return res.redirect("/blogs?page=1");
            }

            else if (!foundBlogs.length && parseInt(page) > 0) {
                req.flash('error', `You've reached the last page`);
                return res.redirect(`/blogs?page=${parseInt(page) - 1}`);
            }

            res.render("getBlogs", {
                blogs: foundBlogs,
                moment: moment,
                next: parseInt(page) + 1,
                errorImage
            });

        })
            .limit(limit)
            .skip(skip);
    }
});


// =============================================
// EXPORT
// =============================================
module.exports = router;