const jwt = require('jsonwebtoken');

const isLoggedIn = async (request, response, next) => {

    try {
        const isVerified = await jwt.verify(
            request.cookies.auth,
            process.env.JWT_SECRET_KEY
        );

        if (!isVerified) {
            throw new Error()
        }

        next()
    }

    catch (error) {
        request.flash('error', 'You need to be logged in to do that')
        response.redirect('/blogs')
    }
}

module.exports = isLoggedIn;