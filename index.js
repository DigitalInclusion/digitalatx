var express = require("express");
var path = require("path");
var mongojs = require("mongojs");
var bodyParser = require("body-parser");
var cookieParser = require("cookie-parser");
var multer = require("multer");
var flash = require("connect-flash");
var passport = require("passport");
var session = require("express-session");

var User = require("./models/user");

var app = express();

var DB_CONNECTION_STRING;
if (app.get("env") === "development") {
  DB_CONNECTION_STRING = require('./config/setMongoUrl.js');
} else {
  DB_CONNECTION_STRING = process.env.MONGO_URL;
}
var db = mongojs(DB_CONNECTION_STRING, ["locations", "users"]);

// FIND LOCATIONS
db.locations.find(function(err, doc) {
  if (err) {
    console.log(err);
  }
  if (doc) {
    console.log('locations present');
  } else {
    console.log('NO LOCATIONS!');
  }
});
db.users.find(function(err, doc) {
  if (err) {
    console.log(err);
  }
  if (doc) {
    console.log("users present");
    console.log(doc);
  } else {
    console.log("NO USERS!");
  }
});

app.set('port', (process.env.PORT || 5000));

app.set("view engine", "ejs");

app.use('/', express.static(__dirname));
app.use('/public/angular_modules', express.static(__dirname + '/public/angular_modules'));
app.use('/asset', express.static(__dirname + '/public'));
app.use('/images', express.static(__dirname + '/public/images'));
app.use(express.static(__dirname + "/views"));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());
app.use(multer());
app.use(session({
  secret: require("./config/sessionSecret.js"),
  resave: true,
  saveUninitialized: true
}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

app.get('/', function(request, response) {
  response.sendFile("/index.html");
});

app.get("/signup", function(req, res) {
  res.render("signup");
});

app.post("/signup", function(req, res, next) {
  var username = req.body.username;
  var password = req.body.password;

  User.findOne({ username: username }, function(err, user) {
    if (err) { return next(err); }
    if (user) {
      req.flash("error", "User already exists");
      return res.redirect("/signup");
    }

    var newUser = new User({
      username: username,
      password: password
    });
    newUser.save(next);
  });
}, passport.authenticate("login", 
    {
      successRedirect: "/",
      failureRedirect: "/signup",
      failureFlash: true
    }
));

app.get('/locationInventory.html', function(request, response) {
  response.sendFile("/locationInventory.html");
});

app.get('/profile1.html', function(request, response) {
  response.sendFile(path.join(__dirname, 'profile1.html'));
});

app.get('/profile/:name/:siteid', function (request, response, next) {
  var name = request.params.name;
  var siteid = request.params.siteid;

  response.sendFile(path.join(__dirname, 'profile.html'));   
});

app.get('/storytelling', function(request, response) {
  response.sendFile(path.join(__dirname, 'storytelling.html'));
});

app.get('/profile2.html', function(request, response) {
  response.sendFile(path.join(__dirname, 'profile2.html'));
});

app.get('/addLocation.html', function(request, response) {
  response.sendFile(path.join(__dirname, 'addLocation.html'));
});

app.post('/addLocation', function(request, response) {
  console.log('ADD LOCATION POST SUCCESSFUL');
  console.log(request.body.formData);
  db.locations.insert(request.body.formData, function(err, doc) {
    if (err) {
      console.log(err);
    }
    if (doc) {
      console.log('INSERT SUCCESSFUL', doc);
    } else {
      console.log('INSERT FAILED');
    }
  });
});

app.post('/getLocations', function(req, res) {
  console.log('/getLocations POST');
  // db.locations.remove({name: 'name'});
  var locations = db.locations.find(function(err, documents) {
    res.json(documents);
  });
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});

module.exports = app;
