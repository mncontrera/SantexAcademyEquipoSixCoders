const Passport = require('passport')
const PassportStrategy = require('./passport-config')

function initializeAuthetication() {
    Passport.use(PassportStrategy)
    return Passport.initialize()
}
module.exports = { initializeAuthetication };