var express = require('express');
var config  = require('./config.js');
module.exports = {
	start: function(){
		var WS_CONFIG = config.getConfig();
		var app = express();
		app.get('/', function (req, res) {
		  res.send('Hello World!');
		});
		console.log("SERVIDOR WEB INICIADO")
		var server = app.listen(WS_CONFIG.WEBSERVER.PORT, function () {
		});
	}
}