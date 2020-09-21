// =============================================
// DEPENDENCIES
// =============================================
require('dotenv').config();
const express = require("express");
const app = express();
const flash = require('connect-flash');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const expressSanitizer = require("express-sanitizer");

app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(express.static(__dirname + "/views"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(expressSanitizer());

// setup flash messages
app.use(session({
    secret: process.env.COOKIE_SECRET,
    name: process.env.COOKIE_NAME,
    cookie: { maxAge: 60000 },
    resave: true,
    saveUninitialized: true
}));

app.use(cookieParser('keyboard cat'));
app.use(flash());
app.use(function (req, res, next) {
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    res.locals.info = req.flash("info");
    next();
})

// =============================================
// RESTFUL ROUTES
// =============================================
app.use(require('./routes/getBlogs'));   // /blogs
app.use(require('./routes/postBlog'));   // /blogs/new -- w/ form
app.use(require('./routes/getBlog'));    // /blogs/:id
app.use(require('./routes/updateBlog')); // /blogs/edit/:id - w/ form
app.use(require('./routes/deleteBlog')); // /blogs/delete/:id

// =============================================
// SERVER
// =============================================
app.listen(process.env.PORT || 8001, () => {
    if (!process.env.PORT) {
        console.log("SERVER HAS STARTED AT http://localhost:8001. TIMESTAMP: ", Date());
    } else {
        console.log("SERVER STARTED AT HEROKU. TIMESTAMP: ", Date());
    }
});
