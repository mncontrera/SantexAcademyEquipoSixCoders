const passport = require('passport');

const isAuthenticated = (req, res, next) => {
    passport.authenticate('jwt', { session: false }, (err, user, info) => {
        console.log(info)
        if (err || !user) {
            const error = new Error(JSON.stringify('Usuario no autorizado'))

            return next(error)
        }
        next()
    })(req, res, next)
}

module.exports = { isAuthenticated }