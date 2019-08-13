module.exports = function (app,url,useDb) {

	function createTable(req, res) {
		
		var MongoClient = require('mongodb').MongoClient;
		//var url = "mongodb://localhost:27017/";
		var array=[];
		MongoClient.connect(url, function(err, db) {
  			if (err) throw err;
  			var dbo = db.db(useDb);
  		 	dbo.listCollections().toArray(function (err, collectionNames) {
      			if (err) {
        			console.log(err);
        			return;
      			}
        		console.log(collectionNames);
        		 array= collectionNames.filter( collec => collec.name===req.params['table'])
				if(array.length ===0)
        		{
        			dbo.createCollection(req.params['table'], function(err, res) {
    				if (err) throw err;
    				console.log("Collection created!");
 	 				});
        			
        		}
        		else{
        			console.log("collection Exists")
        		}
        		
        		
        		
    		});
    		
        		
		});
	}
	//console.log(conn);
	app.get("/api/:table", createTable);
}