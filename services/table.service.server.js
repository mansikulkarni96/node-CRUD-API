var mongoose = require('mongoose')

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

	app.post("/api/:table", createTable);
}