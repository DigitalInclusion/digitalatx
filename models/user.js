var express = require("express");
var bcrypt = require("bcrypt-nodejs");
var SALT_FACTOR = 10;
var app = express();
var DB_CONNECTION_STRING;
if (app.get("env") === "development") {
  DB_CONNECTION_STRING = require('../config/setMongoUrl.js');
} else {
  DB_CONNECTION_STRING = process.env.MONGO_URL;
}
var db = require("mongojs-models")(DB_CONNECTION_STRING);

var userSchema = new db.Schema({
    username: String,
    password: String
});

var noop = function() {};

userSchema.checkPassword = function(guess, done) {
    bcrypt.compare(guess, this.password, function(err, isMatch) {
        done(err, isMatch);
    });
};

userSchema.name = function() {
    return this.username;
}

var User = new db.Model("users", userSchema);

User.preSave(function(done) {
    var user = this;
    // if (!user.isModified("password")) {
    //     return done;
    // }
    bcrypt.genSalt(SALT_FACTOR, function(err, salt) {
        if (err) { return done(err); }
        bcrypt.hash(user.password, salt, noop, function(err, hashedPassword) {
            if (err) { return done(err); }
            user.password = hashedPassword;
            done();
        });
    });
});

module.exports = User;