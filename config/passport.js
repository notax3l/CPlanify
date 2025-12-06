// passport setup for CPlanify

const LocalStrat = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
const User = require('../models/User');

// We export a FUNCTION — this is required by app.js
module.exports = function (passport) {

  // Local login setup
  passport.use(
    new LocalStrat({ usernameField: 'email' }, async (email, pass, done) => {
      try {
        //if user not found
        const found = await User.findOne({ email });
        if (!found) {
          return done(null, false, { message: 'User does not exist' });
        }

        const ok = await bcrypt.compare(pass, found.password);
        if (!ok) { //if password incorrect
          return done(null, false, { message: 'Password incorrect' });
        }

        return done(null, found);
      } catch (err) {
        return done(err);
      }
    })
  );

  // session handling
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser(async (id, done) => {
    try {
      const loggedUser = await User.findById(id);
      done(null, loggedUser);
    } catch (err) {
      done(err);
    }
  });

};
