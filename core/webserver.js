var express = require('express');
module.exports = {
	start: function(){
		var app = express();
		app.get('/', function (req, res) {
		  res.send('Hello World!');
		});
		console.log("SERVIDOR WEB INICIADO")
		var server = app.listen(7000, function () {
		});
	}
}