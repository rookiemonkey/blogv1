// =============================================
// DEPENDENCIES
// =============================================
const express = require("express");
const router = express();
const multer = require('multer');
const cloudinary = require('cloudinary');
const database = require("../schema");
const Post = database.Post;
const isLoggedIn = require('../middlewares/isLoggedIn');
const setMulter = require("../helpers/setMulter");
const setCloudinary = require("../helpers/setCloudinary");
const toUpload = require("../helpers/toUpload");

// configure multer & cloudinary
const upload = setMulter(multer);
cloudinary.config(setCloudinary());

// =============================================
// CREATE - post a blog
// =============================================
router.get("/blogs/new", isLoggedIn, (req, res) => {
    res.render("postBlog");
});

router.post("/blogs/new", isLoggedIn, upload.single('image'), async (req, res) => {
    const uploaded = await toUpload(cloudinary, req);
    const sanitizedTitle = req.sanitize(req.body.blog.title);
    const sanitizedDetails = req.sanitize(req.body.blog.details);
    Post.create({
        title: sanitizedTitle,
        image: uploaded,
        body: sanitizedDetails
    }, (err, newblog) => {
        if (err) {
            req.flash('error', 'Something went wrong upon creating a new Post. Please try again later');
            res.redirect("/blogs?page=1");
        } else {
            req.flash('info', `${sanitizedTitle} was posted successfully`);
            res.redirect("/blogs?page=1");
        }
    });
});

// =============================================
// EXPORT
// =============================================
module.exports = router;