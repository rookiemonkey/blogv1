// =============================================
// DEPENDENCIES
// =============================================
const mongoose = require('mongoose');

// =============================================
// SETUP DATABASE CONNECTION
// =============================================
mongoose.connect(
    process.env.DBURL,
    {
        useNewUrlParser: true, useUnifiedTopology: true
    }
);

mongoose.connection.on("error", () => {
    console.log("something went wrong upon connecting to database")
});

mongoose.connection.on("open", () => {
    console.log("established connection to database. TIMESTAMP: ", Date())
});

// =============================================
// EXPORTS
// =============================================
module.exports.Post = require('./post');
module.exports.User = require('./user');