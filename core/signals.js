var service = require('./services.js');
module.exports = {
	sigint: function(){
		process.stdin.resume();
		process.on('SIGINT', function() {
		 	console.log("CERRANDO WIFREE...");
		 	service.close();
		});
		process.on('SIGTERM', function() {
		  	console.log("CERRANDO WIFREE...");
		  	service.close();
		});
		process.on('exit', function(){
			console.log("CERRANDO WIFREE...");	
		  	service.close();
		});
	}
}