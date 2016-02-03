var config  = require('./config.js');
var service  = require('./services.js');
var stack = require('./stack.js');
var cf;
var methods = {
	config: function(STACK, INDEX, CALLBACK){
		if(typeof INDEX == "function") CALLBACK = INDEX, INDEX = 0;
		if(typeof INDEX == "undefined") INDEX = 0;
		if(typeof STACK[INDEX] != "undefined"){
			service.exec("iptables "+methods.clean(STACK[INDEX]));
			//console.log(methods.clean(STACK[INDEX]));
			methods.config(STACK, (INDEX+1), CALLBACK);
		}
		else
		{
			var callback = stack.unqueued();
			if(typeof callback != "undefined") callback.action(callback.args);
			return;
		}
	},
	allow: function(MAC){
		
	},
	fballow: function(MAC){

	},
	conntrack: function(){

	},
	forward: function(){

	},
	start: function(){
		cf = config.getConfig();
		console.log("APLICANDO NORMAS DE IPTABLES.");
		methods.config(cf.IPTABLES.CONFIG);
	},
	clean: function(line){
		line = line.replace(/\$%WEBSERVER%/g,cf.WEBSERVER.HOST);
		line = line.replace(/\$%WEBPORT%/g,cf.WEBSERVER.PORT);
		line = line.replace(/\$%OUT%/g,cf.IPTABLES.ADAPTER.OUT);
		line = line.replace(/\$%IN%/g,cf.IPTABLES.ADAPTER.IN);
		return line;
	}
}
// INDICAMOS LOS MODULOS A EXPORTAR
module.exports.start = methods.start;
module.exports.allow = methods.allow;
module.exports.fballow = methods.fballow;
