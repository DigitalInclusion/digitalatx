var express = require('express');
var path = require('path');
var mongojs = require('mongojs');
var bodyParser = require('body-parser');
var multer = require('multer');

var app = express();

var DB_CONNECTION_STRING;
if (app.get('env') === 'production') {
  DB_CONNECTION_STRING = process.env.MONGO_URL;
} else {
  DB_CONNECTION_STRING = require('./config/setMongoUrl.js');
}
var db = mongojs(DB_CONNECTION_STRING, ['locations'], {authMechanism: 'ScramSHA1'});

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

app.set('port', (process.env.PORT || 5000));

app.use('/', express.static(__dirname));
app.use('/public/angular_modules', express.static(__dirname + '/public/angular_modules'));
app.use('/asset', express.static(__dirname + '/public'));
app.use('/images', express.static(__dirname + '/public/images'));
app.use(express.static(__dirname + "/views"));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(multer());

app.get('/', function(request, response) {
  response.sendFile("/index.html");
});

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
