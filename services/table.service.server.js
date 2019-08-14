var mongoose = require('mongoose')
var mongo = require('mongodb');


module.exports = function (app,url,useDb) {

	function createTable(req, res) {
		
		var MongoClient = require('mongodb').MongoClient;
		
		MongoClient.connect(url, function(err, db) {
  			if (err) throw err;
  			var dbo = db.db(useDb);
  		 	dbo.listCollections().toArray(function (err, collectionNames) {
      			if (err) {
        			console.log(err);
        			return;
      			}
        		console.log(collectionNames);
        		 var array= collectionNames.filter( collec => collec.name===req.params['table'])
        		 var body = req.body;

				if(array.length ===0)
        		{
        			var itemSchema = new mongoose.Schema({}, { strict: false, collection: req.params['table'] });
					var Item = mongoose.model(req.params['table'], itemSchema);
					var item = new Item(body);
					item.save();
        		}
        		else{
        			console.log("collection Exists");
        			console.log(JSON.stringify(body));
        			const collection = dbo.collection(req.params['table']);
        			collection.insert(body);
        			res.send(body);
        			return;
        		}
    		});
		});
	}



	function findAllTables2(req, res) {
		
		var MongoClient = require('mongodb').MongoClient;
		var result=[];
		MongoClient.connect(url, function(err, db) {
  			if (err) throw err;
  			var dbo = db.db(useDb);
  		 	dbo.listCollections().toArray(function (err, collectionNames) {
      			for(item in collectionNames)
      			{
      				result.push(item)
      			}
      			res.send(collectionNames);
    		});
		});
	}


	function findTable(req,res) {
		var MongoClient = require('mongodb').MongoClient;
		MongoClient.connect(url, function(err, db) {
  		if (err) throw err;
  		var dbo = db.db(useDb);
  		dbo.listCollections().toArray(function (err, collectionNames) {
      			if (err) {
        			console.log(err);
        			return;
      			}
        		console.log(collectionNames);
        		 var array= collectionNames.filter( collec => collec.name===req.params['table'])
        		 var body = req.body;

				if(array.length ===0)
        		{
        			res.send(null);
        		}
        		else{
        			dbo.collection(req.params['table']).find({}).toArray(function(err, result) {
    				if (err) throw err;
    				console.log(result);
    				db.close();
    				res.send(result);
  					});
        		}	
			});

		});
	}

	function findTableRecord(req,res) {
		var MongoClient = require('mongodb').MongoClient;
		MongoClient.connect(url, function(err, db) {
  		if (err) throw err;
  		var dbo = db.db(useDb);
  		dbo.listCollections().toArray(function (err, collectionNames) {
      			if (err) {
        			console.log(err);
        			return;
      			}
        		 console.log(collectionNames);
        		 var array= collectionNames.filter( collec => collec.name===req.params['table'])
        		 var body = req.body;

				if(array.length ===0)
	        		{
	        			res.send(null);
	        		}
        		else{
	  				var query = {"_id": mongo.ObjectId(req.params['id'])};
	        			dbo.collection(req.params['table']).find(query).toArray(function(err, result) {
	    				if (err) throw err;
	    				console.log(result);  			
	    				db.close();
	    				res.send(result);
	  					});
        		}
			});
  	});

	}


	app.get("/api/:table/:id", findTableRecord)
	app.get("/api/:table", findTable)
	app.post("/api/:table", createTable);
	app.get("/api", findAllTables2);
}