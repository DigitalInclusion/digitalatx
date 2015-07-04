var DB_CONNECTION_STRING = process.env.MONGO_URL;
var express = require('express');
var app = express();
var path = require('path');
var mongojs = require('mongojs');
var db = mongojs(DB_CONNECTION_STRING, ['sites', 'locations']);


// db.sites.findOne({
//     "_id": "paulcarroll"
// },function(err, docs) {
//    if(err){
//    	console.log(err);
//    }
//    if (docs) {
//    	console.log('DB CONNECTION ESTABLISHED', docs);
//    } else {
//    	console.log('DB CONNECTION FAIL');
//    }
// });

// FIND LOCATIONS
db.locations.find(function(err, doc) {
  if (err) {
    console.log(err);
  }
  if (doc) {
    console.log(doc);
  } else {
    console.log('NO LOCATIONS!');
  }
});


app.set('port', (process.env.PORT || 5000));

app.post('/somedata',function(req,res){
	db.sites.insert({gender:'F'},function(err,doc){
		if(!err){
			res.json({ok:true});
		} else {
			res.json({ok:false, err:err});
		}
	});
})

app.use('/', express.static(__dirname));
app.use('/public/angular_modules', express.static(__dirname + '/public/angular_modules'));
app.use('/asset',express.static(__dirname + '/public'));
app.use('/images',express.static(__dirname + '/public/images'));

app.get('/', function(request, response) {
  response.sendFile(path.join(__dirname,'index.html'));
});

app.get('/profile1.html', function(request, response) {
  response.sendFile(path.join(__dirname, 'profile1.html'));
});

app.get('/profile2.html', function(request, response) {
  response.sendFile(path.join(__dirname, 'profile2.html'));
});

app.get('/addLocation.html', function(request, response) {
  response.sendFile(path.join(__dirname, 'addLocation.html'));
});

var bodyParser = require('body-parser');
var multer = require('multer');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(multer());

app.post('/addLocation', function(request, response) {
  console.log('ADD LOCATION POST SUCCESSFUL');
  console.log(request.body.formData.name);
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

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
