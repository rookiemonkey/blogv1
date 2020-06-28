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
app.use(require('./public/routes/getBlogs'));   // /blogs
app.use(require('./public/routes/postBlog'));   // /blogs/new -- w/ form
app.use(require('./public/routes/getBlog'));    // /blogs/:id
app.use(require('./public/routes/updateBlog')); // /blogs/edit/:id - w/ form
app.use(require('./public/routes/deleteBlog')); // /blogs/delete/:id

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
