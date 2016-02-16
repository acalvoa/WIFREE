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
				var path = req.path.replace("/wifree", "");
				if(path == "/" || path == ""){
					res.sendFile(path.join(__dirname+"/../webapp/index.html"), function(err){
				    	if (err) {
					      res.status(err.status).end();
					    }
				    });
				}
				else
				{
					res.sendFile(path.join(__dirname+"/../webapp"+ path), function(err){
				    	if (err) {
					      res.status(err.status).end();
					    }
				    });
				}
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