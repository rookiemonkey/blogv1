// =============================================
// DEPENDENCIES
// =============================================
require('dotenv').config();
const express       = require("express");
const app           = express();
const bodyParser    = require("body-parser");
const mongoose      = require("mongoose");
const methodOverride= require("method-override");
const expressSanitizer     = require("express-sanitizer");

app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(express.static(__dirname + "/views"));
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride("_method"));
app.use(expressSanitizer());

// =============================================
// RESTFUL ROUTES
// =============================================
app.use(require('./public/routes/getBlogs'));
app.use(require('./public/routes/postBlog'));

// // NEW ROUTE - shows a form to add a new blog
// app.get("/blogs/new", (req,res) => {
//     res.render("newBlog");
// });


// // CREATE ROUTE - doesnt render anything, only process infos then redirect
// app.post("/blogs", (req,res) => {
//     let sanitizedTitle = req.sanitize(req.body.blog.title);
//     let sanitizedDetails = req.sanitize(req.body.blog.details);
//     Post.create({
//         title: sanitizedTitle,
//         image: req.body.blog.image,
//         body: sanitizedDetails
//     }, (err, newblog) => {
//         if (err) {
//             console.error(err);
//             res.redirect("/");
//         } else {
//             res.redirect("/");
//         };
//     });
// });


// SHOW ROUTE
app.get("/blogs/:id", (req, res) => {
    Post.findById({ _id: req.params.id }, (err, foundPost) => {
        if(err) {
            console.error(err);
            res.redirect("/");
        } else {
            res.render("ablog", {foundPost: foundPost});
        }
    });
});


// EDIT ROUTE partner with UPDATE ROUTE
app.get("/blogs/:id/edit", (req, res) => {
    Post.findById(req.params.id, (err, foundPost) => {
        if(err) {
            console.error(err);
        } else {
            res.render("editblog", {foundPost: foundPost});
        }
    });
});


// UPDATE ROUTE (partner with EDIT ROUTE) with PUT REQUEST
app.put("/blogs/:id", (req, res) => {
    let sanitizedDetails = req.sanitize(req.body.blog.details);
    let sanitizedTitle = req.sanitize(req.body.blog.title);
    let updates = { title: sanitizedTitle, image: req.body.blog.image, body: sanitizedDetails }
    Post.findByIdAndUpdate(req.params.id, updates, (err, updatedPost) => {
        if (err) {
            console.error(err)
        } else {
            res.redirect(`/blogs/${req.params.id}`)
        }
    });
});


// DELETE ROUTE
app.delete("/blogs/:id", (req, res) => {
    Post.findByIdAndDelete(req.params.id, (err) => {
        err ? console.log(err) : res.redirect("/");
    });
});


// =============================================
// SERVER
// =============================================
app.listen(8001 || process.env.PORT, () => {
    if (!process.env.PORT) {
        console.log("SERVER HAS STARTED AT http://localhost:8001. TIMESTAMP: ", Date());
    } else {
        console.log("SERVER STARTED AT HEROKU. TIMESTAMP: ", Date());
    }
});
