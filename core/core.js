var config  = require('./config.js');
var iptables  = require('./iptables.js');
var methods = {
	start: function(){
		var cf = config.getConfig();
		config.setEnv(cf.GLOBAL.ENVIRONMENT);
		console.log("\nIniciando WIFREE en modo "+cf.GLOBAL.ENVIRONMENT);
		iptables.start();
	}
}
// INDICAMOS LOS MODULOS A EXPORTAR
module.exports.start = methods.start;