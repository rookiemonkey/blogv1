// =============================================
// DEPENDENCIES
// =============================================
const express = require("express");
const router = express();
const multer = require('multer');
const cloudinary = require('cloudinary');
const database = require("../schema");
const Post = database.Post;
const setMulter = require("../helpers/setMulter");
const setCloudinary = require("../helpers/setCloudinary");
const toUpload = require("../helpers/toUpload");

// configure multer & cloudinary
const upload = setMulter(multer);
cloudinary.config(setCloudinary());

// =============================================
// CREATE - post a blog
// =============================================
router.get("/blogs/new", (req, res) => {
    res.render("postBlog");
});

router.post("/blogs/new", upload.single('image'), async (req, res) => {
    const uploaded = await toUpload(cloudinary, req).then(u => { return u.secure_url });
    const sanitizedTitle = req.sanitize(req.body.blog.title);
    const sanitizedDetails = req.sanitize(req.body.blog.details);
    Post.create({
        title: sanitizedTitle,
        image: uploaded,
        body: sanitizedDetails
    }, (err, newblog) => {
        if(err) {
            req.flash('error', 'Something went wrong upon creating a new Post. Please try again later');
            res.redirect("/blogs");
        } else {
            req.flash('info', `${sanitizedTitle} was posted successfully`);
            res.redirect("/blogs");
        }
    });
});

// =============================================
// EXPORT
// =============================================
module.exports = router;