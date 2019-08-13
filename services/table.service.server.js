module.exports = function (app) {

	function createTable(req, res) {
		console.log("create Table invoked");
		var MongoClient = require('mongodb').MongoClient;
		var url = "mongodb://localhost:27017/";

		MongoClient.connect(url, function(err, db) {
  		if (err) throw err;
  		var dbo = db.db("CRUD-tool");
  		dbo.createCollection("customers", function(err, res) {
    	if (err) throw err;
    	console.log("Collection created!");
    	db.close();
 	 	});
	});
	}

	app.get("/api/table", createTable);
}