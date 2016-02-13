var config  = require('./config.js');
var service  = require('./services.js');
var stack = require('./stack.js');
var cf;
var methods = {
	config: function(STACK, INDEX, CALLBACK){
		if(typeof INDEX == "function") CALLBACK = INDEX, INDEX = 0;
		if(typeof INDEX == "undefined") INDEX = 0;
		if(typeof STACK[INDEX] != "undefined" && STACK[INDEX] == "$%FACEBOOKIP%"){
			for(i=0; i<cf.FACEBOOK.IPLIST.length; i++){
				service.exec("iptables -t mangle -A facebookip -s "+cf.FACEBOOK.IPLIST[0]+" -j MARK --set-mark 11");
				service.exec("iptables -t mangle -A facebookip -d "+cf.FACEBOOK.IPLIST[0]+" -j MARK --set-mark 11");
			}
			methods.config(STACK, (INDEX+1), CALLBACK);
		}
		else if(typeof STACK[INDEX] != "undefined"){
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
	getMACfromIP: function(ip, callback){
		service.exec("arp -n | grep "+ip+" | awk '{print $3}'", function(stdout){
			if(typeof callback != "undefined") callback(stdout.STDOUT.substring(0,16));
		});
	},
	allow: function(MAC,callback){
		service.exec("iptables -t mangle -I internet -m mac --mac-source "+MAC+" -j RETURN", function(stdout){
			console.log("ACCESO A "+MAC);
			if(typeof callback != "undefined") callback();
		});		
	},
	fballow: function(MAC){
		service.exec("iptables -t mangle -I facebooklist -m mac --mac-source "+MAC+" -j facebookip", function(stdout){
			return true;
		});		
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
		line = line.replace(/\$%WEBSERVER%/g,cf.GLOBAL.WIFI_IP);
		line = line.replace(/\$%WEBPORT%/g,cf.WEBSERVER.PORT);
		line = line.replace(/\$%OUT%/g,cf.IPTABLES.ADAPTER.OUT);
		line = line.replace(/\$%IN%/g,cf.IPTABLES.ADAPTER.IN);
		line = line.replace(/\$%IPCRM%/g,cf.GLOBAL.CRM_SERVER);
		return line;
	}
}
// INDICAMOS LOS MODULOS A EXPORTAR
module.exports.start = methods.start;
module.exports.allow = methods.allow;
module.exports.fballow = methods.fballow;
module.exports.getMACfromIP = methods.getMACfromIP;
