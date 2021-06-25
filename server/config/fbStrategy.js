require('dotenv').config();
const User = require('../models/MyUser');
const FacebookStrategy = require('passport-facebook').Strategy;
const GoogleStrategy = require('passport-google-oauth20').Strategy;

module.exports = (passport) => {
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
      done(null, user);
    });
  });

  passport.use(
    new FacebookStrategy(
      {
        clientID: process.env.FACEBOOK_APP_ID,
        clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
        callbackURL: 'http://localhost:8000/passport/facebook/callback',
        profileFields: ['id', 'displayName'],
      },
      (accessToken, refreshToken, profile, done) => {
        console.log(profile);
        User.findOne({ facebookId: profile.id }, (error, user) => {
          if (error) return done(error);
          if (user) {
            return done(null, user);
          } else {
            const newUser = new User({
              facebookId: profile.id,
              name: profile.displayName,
            });
            newUser.save((error, doc) => {
              return done(null, doc);
            });
          }
        });
      }
    )
  );

  //=============== GOOGLE STRATEGY ==============

  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: 'http://localhost:8000/passport/auth/google/callback',
      },
      (accessToken, refreshToken, profile, done) => {
        console.log('line +++++++ 55', profile);
        User.findOne({ googleId: profile.id })
          .then((user) => {
            if (user) {
              return done(null, user);
            }

            const newUser = new User({
              googleId: profile.id,
              name: profile.displayName,
            });
            newUser.save((err, user) => {
              if (err) {
                return done(err, false);
              }
              return done(null, user);
            });
          })
          .catch((err) => {
            return done(err, false);
          });
      }
    )
  );
};
