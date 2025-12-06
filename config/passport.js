// passport setup for CPlanify

const passport = require('passport');
const LocalStrat = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
const User = require('../models/User');

// local login setup
passport.use(
  new LocalStrat({ usernameField: 'email' }, async (email, pass, done) => {
    try {
      const found = await User.findOne({ email });
      if (!found) {
        return done(null, false, { message: 'User does not exist' });
      }

      const ok = await bcrypt.compare(pass, found.password);
      if (!ok) {
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

// export the actual passport instance
module.exports = passport;
