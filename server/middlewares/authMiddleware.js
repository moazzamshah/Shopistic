const passport = require('passport');

const protect = passport.authenticate('jwt', { session: false });

const admin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(401);
    throw new Error('Not authorized as an admin');
  }
};

module.exports =  { protect, admin };
