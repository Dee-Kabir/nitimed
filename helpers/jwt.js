const expressJwt = require('express-jwt')

exports.authJwt = expressJwt({
        secret: process.env.JWT_SECRET,
        algorithms: ["HS256"]
})