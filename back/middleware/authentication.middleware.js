const passport = require('passport');

const isAuthenticated = (req, res, next) => {
  passport.authenticate('jwt', { session: false }, (err, user) => {
    if (err || !user) {
      next(err);
    }
    next();
  })(req, res, next);
};

module.exports = { isAuthenticated };
