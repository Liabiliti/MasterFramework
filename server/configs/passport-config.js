// passport-config.js
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const db = require('./db'); // Adjust the path as necessary

// Configure Passport to use the local strategy.
passport.use(new LocalStrategy(
 function(username, password, done) {
    const query = "SELECT ID FROM admin WHERE `User Name` = ? AND Password = ?";
    db.query(query, [username, password], (error, results) => {
      if (error) { return done(error); }
      if (!results.length) {
        return done(null, false, { message: 'Incorrect Email or Password' });
      }
      return done(null, results[0]);
    });
 }
));

// Configure Passport authenticated session persistence.
passport.serializeUser(function(user, done) {
 done(null, user.ID);
});

passport.deserializeUser(function(id, done) {
 // Here you would typically fetch the user from your database using the ID
 // For simplicity, we'll just return the ID
 done(null, { ID: id });
});

module.exports = passport;
