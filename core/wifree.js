/* 
*@file core.js
*@brief WIFREE
*Nucleo de inicio de WIFREE
*@bugs No conocidos
*/
var fs = require('fs');
var service = require('./services.js');
var config = require('./config.js');
var signal = require('./signals.js');
var web = require('./webserver.js');
var exports = require('./exports.js');
// INCLUIMOS LOS METODOS A UTILIZAR DURANTE LA REALIZACION DE INICIALIZACION
methods = {
	start: function(callback){
		fs.readFile(exports.PATH+'/package.json', 'utf8', function(err,datos) {
			if(err) {
				console.log("ERROR LA HOJA DE METADATA NO EXISTE");
				service.close();
			}
			var info = JSON.parse(datos);
			service.clear();
			console.log('***********************************');
			console.log('* '+info.NAME+" "+info.CODENAME);
			console.log('* VERSION: '+info.VERSION);
			console.log('* DESARROLLADOR: '+info.DEVELOPER);
			console.log('* FECHA: '+info.LASTUPDATE);
			console.log('***********************************');
			console.log(' ');
			console.log("INICIALIZANDO APLICATIVO...");
			console.log(' ');
			callback();
	    });
	},
	signals: function(){
		signal.sigint();
	}
};
module.exports = {
	start: function(){
		methods.signals();
		methods.start(function(){
			config.load(web.start);
		});
	},
};
