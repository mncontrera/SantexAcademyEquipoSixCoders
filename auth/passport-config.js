const passportJwt = require('passport-jwt');
const db = require('../models')

const ExtractJwt = passportJwt.ExtractJwt;
const StrategyJwt = passportJwt.Strategy;

const PassportStrategy = new StrategyJwt({
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: 'claveSixCoders'
}, async (jwtPayload, next) => {
    try{
        const user = await db.User.findByPk(jwtPayload.id)
    if (user) {
        next(null, user)
    } else {
        next(null,false)
    }
    }catch (err){
        next(err,false)
    }
})

module.exports = PassportStrategy 