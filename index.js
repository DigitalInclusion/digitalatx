var DB_CONNECTION_STRING = process.env.MONGO_URL;
var express = require('express');
var app = express();
var path = require('path');
var mongojs = require('mongojs');
var db = mongojs(DB_CONNECTION_STRING, ['sites']);


db.sites.findOne({
    "_id": "paulcarroll"
},function(err, docs) {
   if(err){
   	console.log(err);
   }
   if (docs) {
   	console.log('DB CONNECTION ESTABLISHED', docs);
   	db.sites.insert({gender:'M'},function(err,doc){
   		if(err) console.log(err);
   		console.log(doc);
   	});
   } else {
   	console.log('DB CONNECTION FAIL');
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

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
