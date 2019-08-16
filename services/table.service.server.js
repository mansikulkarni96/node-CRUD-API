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
					res.send(item);
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



	function findAllTables(req, res) {
		
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


	function findByPredicates(req,res) {
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
        			var query = {};
					var field = "salary";
					var operator= 2000;
					//query[field] <= operator;
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

	function updateTableRecord(req,res) {
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
	  				var newvalues = { $set: body};
	        			dbo.collection(req.params['table']).updateOne(query, newvalues, function(err, result) {
	        			var  val = result['result']['nModified'];
	        			if(val === 0)
	        			{
	        				res.send(null);
	        			}
	        			dbo.collection(req.params['table']).find(query).toArray(function(err, result) {
	    				if (err) throw err;
	    				console.log(result);  			
	    				db.close();
	    				res.send(result);
	  					});
	    				console.log("1 document updated"); 	
	    						
	  					});
	  					
        		}
			});
  	});

	}


	function deleteTableRecord(req,res) {
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
	        			dbo.collection(req.params['table']).deleteOne(query, function(err, obj) {
	    				if (err) throw err;
	    				console.log("1 document deleted");  
	    				res.send("document deleted")			
	    				db.close();
	  					});
        		}
			});
  	});

	}

	function deleteTable(req,res) {
		var MongoClient = require('mongodb').MongoClient;
		MongoClient.connect(url, function(err, db) {
  		if (err) throw err;
  		var dbo = db.db(useDb);
  		dbo.collection(req.params['table']).drop(function(err, ok) {
    	if (err) throw err;
    	if (ok) console.log("Collection deleted");
	    res.send("Collection deleted")			
	    db.close();
	  	});
        });
	}


	function createMappingTables(req,resp){
		console.log("Hello")
		var MongoClient = require('mongodb').MongoClient;
		MongoClient.connect(url, function(err, db) {
		  if (err) throw err;
		  var dbo = db.db(useDb);
		  var tab = req.params['table1'];
		  console.log(tab);
		  dbo.collection(tab).aggregate([
		    { $lookup:
		       {
		         from: req.params['table2'],
		         localField: 'commentId',
		         foreignField: 'id',
		         as: 'user_new_table'
		       }
		     }
		    ]).toArray(function(err, res) {
		    if (err) throw err;
		    console.log(req.params['id1'])
		    var result = res.filter( item => ((item['_id'].toString() === req.params['id1'])))
		    resp.send(result);
		    db.close();
		  });
		});
	}

	function getMappingTables(req,resp){
		console.log("Hello")
		var MongoClient = require('mongodb').MongoClient;
		MongoClient.connect(url, function(err, db) {
		  if (err) throw err;
		  var dbo = db.db(useDb);
		  var tab = req.params['table1'];
		 
		  dbo.collection(tab).aggregate([
		    { $lookup:
		       {
		         from: req.params['table2'],
		         localField: 'commentId',
		         foreignField: 'id',
		         as: 'user_new_table'
		       }
		     }
		    ]).toArray(function(err, res) {
		    if (err) throw err;
		    var result = res.filter( item => ((item['_id'].toString() === req.params['id1'])))
		    resp.send(result);
		    db.close();
		  });
		});
	}


	function createMappingTable2(req, res) {
			
			var MongoClient = require('mongodb').MongoClient;
			
			MongoClient.connect(url, function(err, db) {
	  			if (err) throw err;
	  			var dbo = db.db(useDb);
	  		 	dbo.listCollections().toArray(function (err, collectionNames) {
	      			if (err) {
	        			console.log(err);
	        			return;
	      			}
	        		var existingTable1 = false;
	        		var existingTable2 = false;
	        		var table1 = collectionNames.filter( collec => collec.name=== req.params['table1'])
	        		if (table1.length > 0) {
	        			existingTable1 = true;
	        		}
	        		var table2 = collectionNames.filter( collec => collec.name=== req.params['table2'])
	        		if (table2.length > 0) {
	        			existingTable2 = true;
	        		}
	        		if(existingTable1 && existingTable2){
	        		var mappingTab = '';
	        		var mappingTab1 =  req.params['table1'] + "_" + req.params['table2'];
	        		var mappingTab2 = req.params['table2'] + "_" + req.params['table1'];
	        		var mapTableExists = false;
	        		var array= collectionNames.filter( collec => collec.name=== mappingTab1)
	        		if(array.length > 0){
	        			mapTableExists = true;
	        			mappingTab = mappingTab1;
	        		}
	        		var array2= collectionNames.filter( collec => collec.name=== mappingTab2)
	        		if(array2.length > 0){
	        			mapTableExists = true;
	        			mappingTab = mappingTab2;
	        		}
	        		 var tab1= req.params['table1']
	        		 console.log(tab1);
	        		 var id1 = req.params['id1']
	        		 var tab2= req.params['table2']
	        		 var id2 = req.params['id2']
	        		 var body= {[tab1]: id1, [tab2] : id2};
	        		
					if(!mapTableExists)
	        		{
	        			var itemSchema = new mongoose.Schema({}, { strict: false, collection: mappingTab });
						var Item = mongoose.model(mappingTab, itemSchema);
						var item = new Item(body);
						item.save();
						res.send(item);
	        		}
	        		else{
	        			console.log("collection Exists");
	        			console.log(JSON.stringify(body));
	        			const collection = dbo.collection(mappingTab);
	        			collection.insert(body);
	        			res.send(body);
	        			return;
	        		}}
	        		else res.send(null);
	    		});
			});
		}

	app.delete("/api/:table", deleteTable)
	app.delete("/api/:table/:id", deleteTableRecord)
	app.get("/api/:table/:id", findTableRecord)
	app.put("/api/:table", findByPredicates)
	app.put("/api/:table/:id", updateTableRecord)
	app.get("/api/:table", findTable)
	app.post("/api/:table", createTable);
	app.get("/api", findAllTables);
	app.get("/api/:table1/:id1/:table2/:id2", createMappingTable2)
	app.get("/api/:table1/:id1/:table2", getMappingTables)
}