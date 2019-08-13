var express = require('express')
var app = express()
var mongoose = require('mongoose')
var url ='mongodb://localhost:27017/';
var useDb = 'CRUD-tool';
//mongoose.connect('mongodb://heroku_674vnd6l:qvie32tkbjru83t21rsoml39ml@ds019638.mlab.com:19638/heroku_674vnd6l',
 //{useNewUrlParser: true});

var conn = mongoose.connect('mongodb://localhost:27017/CRUD-tool', {useNewUrlParser: true});

var pageSchema = mongoose.Schema({
	title: String
}, {collection: 'students'});

var pageModel = mongoose.model('PageModel', pageSchema)

var bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// Configure CORS
app.use(function(req, res, next) {
   res.header("Access-Control-Allow-Origin",
       "http://localhost:4200");
   res.header("Access-Control-Allow-Headers",
       "Origin, X-Requested-With, Content-Type, Accept");
   res.header("Access-Control-Allow-Methods",
       "GET, POST, PUT, DELETE, OPTIONS");
   res.header("Access-Control-Allow-Credentials", "true");
   next();
});


var tableService = require(
	'./services/table.service.server.js')


tableService(app,url,useDb)

app.listen(process.env.PORT || 3000)
