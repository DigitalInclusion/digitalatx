var express = require('express');
var app = express();
var path = require('path');
app.set('port', (process.env.PORT || 5000));

app.use('/asset',express.static(__dirname + '/public'));
app.use('/images',express.static(__dirname + '/public/images'));

app.get('/', function(request, response) {
  response.sendFile(path.join(__dirname,'index.html'));
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
