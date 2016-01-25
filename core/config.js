var service = require('./services.js');
var stack = require('./stack.js');
var _GLOBAL_CONFIG =  {};

var methods = {
	iptables: function(args){
		console.log("CARGANDO CONFIGURACIONES");
		service.fetch('./config/iptables.json', function(err,datos) {
			if(err) {
				console.log("ERROR LA HOJA DE CONFIGURACIONES IPTABLES, NO EXISTE.");
				service.close();
			}
			var CONFIG = JSON.parse(datos);
			// INTEGRAMOS LOS PARAMETROS IPTABLES
			console.log("CARGANDO CONFIGURACIÓN IPTABLES...");
			/*methods.iptables(CONFIG.IPTABLES, function(){
			});*/
			_GLOBAL_CONFIG['IPTABLES'] = CONFIG;
			var callback = stack.unqueued();
			if(typeof callback != "undefined") callback.action(callback.args);
	    });
	},
	httpServer: function(callback){
		service.fetch('./config/webserver.json', function(err,datos) {
			if(err) {
				console.log("ERROR LA HOJA DE CONFIGURACIONES WEBSERVER, NO EXISTE.");
				service.close();
			}
			var CONFIG = JSON.parse(datos);
			// INTEGRAMOS LOS PARAMETROS IPTABLES
			console.log("CARGANDO CONFIGURACIÓN WEBSERVER...");
			/*methods.iptables(CONFIG.IPTABLES, function(){
			});*/
			_GLOBAL_CONFIG['WEBSERVER'] = CONFIG;
			var callback = stack.unqueued();
			if(typeof callback != "undefined") callback.action(callback.args);
	    });
	},
	CRMServer: function(callback){
		service.fetch('./config/webserver.json', function(err,datos) {
			if(err) {
				console.log("ERROR LA HOJA DE CONFIGURACIONES CRMSERVER, NO EXISTE.");
				service.close();
			}
			var CONFIG = JSON.parse(datos);
			// INTEGRAMOS LOS PARAMETROS IPTABLES
			console.log("CARGANDO CONFIGURACIÓN WIFREE-CRM...");
			/*methods.iptables(CONFIG.IPTABLES, function(){
			});*/
			_GLOBAL_CONFIG['CRMSERVER'] = CONFIG;
			var callback = stack.unqueued();
			if(typeof callback != "undefined") callback.action(callback.args);
	    });
	},
	continue: function(args){
		if(typeof args != "undefined" && typeof args.callback != "undefined") args.callback();
	},
	load: function(cb){
		stack.queued(methods.iptables);
		stack.queued(methods.httpServer);
		stack.queued(methods.CRMServer);
		stack.queued(methods.continue, {
			callback: cb
		});
		stack.start();
	},
	getConfig: function(){
		return _GLOBAL_CONFIG;
	}
};
//cargamos los modelos a exportar
module.exports.load = methods.load;
module.exports.getConfig = methods.getConfig;