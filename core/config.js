var service = require('./services.js');
var methods = {
	iptables: function(STACK, INDEX, CALLBACK){
		if(typeof INDEX == "function") CALLBACK = INDEX, INDEX = 0;
		if(typeof INDEX == "undefined") INDEX = 0;
		if(typeof STACK[INDEX] != "undefined"){
			service.exec("iptables "+STACK[INDEX]);
			methods.iptables(STACK, (INDEX+1), CALLBACK);
		}
		else
		{
			if(typeof CALLBACK != "undefined") CALLBACK();
			return;
		}
	}
};
module.exports = {
	load: function(callback){
		console.log("CARGANDO CONFIGURACIONES");
		service.fetch('./config/config.json', function(err,datos) {
			if(err) {
				console.log("ERROR LA HOJA DE CONFIGURACIONES NO EXISTE");
				service.close();
			}
			var CONFIG = JSON.parse(datos);
			// INTEGRAMOS LOS PARAMETROS IPTABLES
			console.log("CONFIGURANDO IPTABLES...");
			methods.iptables(CONFIG.IPTABLES, function(){
			});
			if(typeof callback != "undefined") callback();
	    });
	}
};