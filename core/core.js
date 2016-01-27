var config  = require('./config.js');
var iptables  = require('./iptables.js');
var stack = require('./stack.js');
var webserver = require('./webserver.js');
var methods = {
	start: function(){
		var cf = config.getConfig();
		config.setEnv(cf.GLOBAL.ENVIRONMENT);
		console.log("\nIniciando WIFREE en modo "+cf.GLOBAL.ENVIRONMENT);
		stack.queued(iptables.start);
		stack.queued(webserver.start);
		start.start();
	}
}
// INDICAMOS LOS MODULOS A EXPORTAR
module.exports.start = methods.start;