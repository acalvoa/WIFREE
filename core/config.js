var service = require('./services.js');
var stack = require('./stack.js');
var core = require('./core.js');
var _GLOBAL_CONFIG =  {};

var methods = {
	iptables: function(args){
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
		service.fetch('./config/CRMserver.json', function(err,datos) {
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
	global: function(callback){
		service.fetch('./config/global.json', function(err,datos) {
			if(err) {
				console.log("ERROR LA HOJA DE CONFIGURACIONES GLOBALES, NO EXISTE.");
				service.close();
			}
			var CONFIG = JSON.parse(datos);
			// INTEGRAMOS LOS PARAMETROS IPTABLES
			console.log("CARGANDO CONFIGURACIONES GLOBALES...");
			/*methods.iptables(CONFIG.IPTABLES, function(){
			});*/
			_GLOBAL_CONFIG['GLOBAL'] = CONFIG;
			var callback = stack.unqueued();
			if(typeof callback != "undefined") callback.action(callback.args);
	    });
	},
	facebook: function(callback){
		service.fetch('./config/facebook.json', function(err,datos) {
			if(err) {
				console.log("ERROR LA HOJA DE CONFIGURACIONES FACEBOOK, NO EXISTE.");
				service.close();
			}
			var CONFIG = JSON.parse(datos);
			// INTEGRAMOS LOS PARAMETROS IPTABLES
			console.log("CARGANDO CONFIGURACIÓN DE FACEBOOK...");
			/*methods.iptables(CONFIG.IPTABLES, function(){
			});*/
			_GLOBAL_CONFIG['FACEBOOK'] = CONFIG;
			var callback = stack.unqueued();
			if(typeof callback != "undefined") callback.action(callback.args);
	    });
	},
	dns_server: function(callback){
		service.fetch('/etc/resolv.conf', function(err,datos) {
			console.log(datos);
		});
	},
	continue: function(args){
		if(typeof args != "undefined" && typeof args.callback != "undefined") args.callback();
	},
	load: function(cb){
		console.log("CARGANDO CONFIGURACIONES");
		stack.queued(methods.dns_server);
		stack.queued(methods.httpServer);
		stack.queued(methods.iptables);
		stack.queued(methods.global);
		stack.queued(methods.facebook);
		stack.queued(methods.CRMServer);
		stack.queued(core.start)
		stack.start();
	},
	getConfig: function(){
		return _GLOBAL_CONFIG;
	},
	setEnv: function(eve){
		if(eve == "PRODUCTION"){
			for(key in _GLOBAL_CONFIG){
				for(keyin in _GLOBAL_CONFIG[key]){
					if(typeof _GLOBAL_CONFIG[key][keyin].PRODUCTION != "undefined") _GLOBAL_CONFIG[key][keyin] = _GLOBAL_CONFIG[key][keyin].PRODUCTION;
				}
			}
		}
		else if(eve == "DEVELOPER"){

			for(key in _GLOBAL_CONFIG){
				for(keyin in _GLOBAL_CONFIG[key]){
					if(typeof _GLOBAL_CONFIG[key][keyin].DEVELOPER != "undefined") _GLOBAL_CONFIG[key][keyin] = _GLOBAL_CONFIG[key][keyin].DEVELOPER;
				}
			}
		}
	}
}
//cargamos los modelos a exportar
module.exports.load = methods.load;
module.exports.getConfig = methods.getConfig;
module.exports.setEnv = methods.setEnv;