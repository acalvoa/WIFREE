var express = require('express');
var config  = require('./config.js');
module.exports = {
	start: function(){
		var WS_CONFIG = config.getConfig();
		var app = express();
		var path = require('path');
		app.get('/', function(req, res) {
		    res.sendFile(path.join(__dirname+"/../services"+ '/redirect.html'));
		});
		app.get('/*', function(req, res) {
		    res.sendFile(path.join(__dirname+"/../services"+ '/redirect.html'));
		});
		app.get('/wifree/*', function(req, res) {
		    res.sendFile(path.join(__dirname+"/../webapp"+ '/'+req.url), function(err){
		    	if (err) {
			      res.status(err.status).end();
			    }
		    });
		});
		console.log("SERVIDOR WEB INICIADO")
		var server = app.listen(WS_CONFIG.WEBSERVER.PORT, function () {
			
		});
	}
}