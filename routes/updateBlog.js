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
// UPDATE - edit/update a blog
// =============================================
router.get("/blogs/edit/:id", isLoggedIn, (req, res) => {
    Post.findById(req.params.id, (err, foundPost) => {
        if (err) {
            req.flash('error', 'Something went wrong upon rendering the edit form for this post');
            return res.redirect(`/blogs?page=1`);
        }

        res.render('editBlog', {
            foundPost: foundPost,
            session: req.cookies.auth
        })
    });
});

router.post("/blogs/edit/:id", isLoggedIn, upload.single('image_update'), async (req, res) => {
    const imageUrl = await toUpload(cloudinary, req)
    const { details, title, image_default } = req.body;
    let sanitizedDetails = req.sanitize(details);
    let sanitizedTitle = req.sanitize(title);
    let image = imageUrl ? imageUrl : image_default
    let updates = { title: sanitizedTitle, image, body: sanitizedDetails }
    Post.findByIdAndUpdate(req.params.id, updates, err => {
        if (err) {
            req.flash('error', 'Something went wrong upon updating the post. Please try again later');
            res.redirect(`/blogs/${req.params.id}`);
        } else {
            req.flash('info', `${sanitizedTitle} was updated successfully`);
            res.redirect(`/blogs/${req.params.id}`);
        }
    });
});


// =============================================
// EXPORT
// =============================================
module.exports = router;