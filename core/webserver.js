var express = require('express');
var config  = require('./config.js');
var service = require('./services.js');
var ws = require('../services/webservices.js');
module.exports = {
	start: function(){
		var WS_CONFIG = config.getConfig();
		var app = express();
		var path = require('path');
		//UBICAMOS LAS PETICIONES GET AL SERVIDOR
		//1ERA PETICION CORRESPONDE AL PATH SIN ELEMENTO INDICADOR
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
		//2DA CORRESPONDE A CUALQUIER RUTA QUE DEBA SER ENRUTADA
		app.get('/*', function(req, res) {
			console.log(req.url);
			console.log(req.url.indexOf("/wifree"));
			if(req.url.indexOf("/wifreews/") == 0){
				var pathUrl = req.path.replace("/wifreews/", "");
				console.log(pathUrl);
			}
			else if(req.url.indexOf("/wifree") == 0){
				var pathUrl = req.path.replace("/wifree", "");
				if(pathUrl == "/" || pathUrl == ""){
					res.sendFile(path.join(__dirname+"/../webapp/index.html"), function(err){
				    	if (err) {
					      res.status(err.status).end();
					    }
				    });
				}
				else
				{
					console.log(pathUrl);
					res.sendFile(path.join(__dirname+"/../webapp"+ pathUrl), function(err){
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