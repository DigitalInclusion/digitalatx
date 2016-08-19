var passport = require("passport");
var bcrypt = require("bcrypt-nodejs");
var LocalStrategy = require("passport-local").Strategy;

var User = require("./models/user");

passport.use("login", new LocalStrategy(function(username, password, done) {
    User.findOne({ username: username }, function(err, user) {
        if (err) { return done(err); }
        if (!user) {
            return done(null, false, { message: "No user has that username!" });
        }
        // ERROR: checkPassword is not a function
        // user.checkPassword(password, function(err, isMatch) {
        //     if (err) { return done(err); }
        //     if (isMatch) {
        //         return done(null, user);
        //     } else {
        //         return done(null, false, { message: "Invalid password." });
        //     }
        // });
        bcrypt.compare(password, user.password, function(err, isMatch) {
            if (err) { return done(err); }
            if (isMatch) {
                return done(null, user);
            } else {
                return done(null, false, { message: "Invalid password." });
            }
        });
    });
}));

module.exports = function() {

    passport.serializeUser(function(user, done) {
        done(null, user._id);
    });

    passport.deserializeUser(function(id, done) {
        // User.findById(id, function(err, user) {
        //     done(err, user);
        // });
        User.findOne({ _id: id }, function(err, user) {
            done(err, user);
        });
    });
};