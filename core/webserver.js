var express = require('express');
var config  = require('./config.js');
var service = require('./services.js');
module.exports = {
	start: function(){
		var WS_CONFIG = config.getConfig();
		var app = express();
		var path = require('path');
		app.get('/', function(req, res) {
		    service.fetch(path.join(__dirname+"/../services"+ '/redirect.html'), function(err,datos) {
				if(err) {
					service.close();
				}
				datos = datos.replace("[[IP]]", WS_CONFIG.GLOBAL.WIFI_IP);
				datos = datos.replace("[[PORT]]", WS_CONFIG.WEBSERVER.PORT);
				res.send(datos);
		    });
		});
		app.get('/*', function(req, res) {
			if(req.url.indexOf("/wifree/") == 0){
				res.sendFile(path.join(__dirname+"/../webapp"+ '/'+req.url.replace("/wifree/", "")), function(err){
			    	if (err) {
				      res.status(err.status).end();
				    }
			    });
			}
			else
			{
				service.fetch(path.join(__dirname+"/../services"+ '/redirect.html'), function(err,datos) {
					if(err) {
						service.close();
					}
					datos = datos.replace("[[IP]]", WS_CONFIG.GLOBAL.WIFI_IP);
					datos = datos.replace("[[PORT]]", WS_CONFIG.WEBSERVER.PORT);
					res.send(datos);
			    });
			}
		    
		});
		console.log("SERVIDOR WEB INICIADO")
		var server = app.listen(WS_CONFIG.WEBSERVER.PORT, function () {
			
		});
	}
}