var fs = require('fs');
var exec = require('child_process').exec;
var sys = require("util");
module.exports = {
	clear: function(){
		process.stdout.write('\u001B[2J\u001B[0;0f');
	},
	close: function(){
		exec("iptables -F",  function (error, stdout, stderr) {
    		console.log("CERRANDO WIFREE...");
    		process.exit(1);
    	});
	},
	read: function(ASK,CALLBACK){
		if(typeof ASK == "string") ASK+="\n\r";
		if(typeof ASK == "function") CALLBACK = ASK, ASK = "";
		var readline = require('readline');
		var rl = readline.createInterface({
		  input: process.stdin,
		  output: process.stdout
		});
		rl.question(ASK, function(answer) {
		  if(typeof CALLBACK != "undefined") CALLBACK();
		  rl.close();
		});
	},
	writeFile: function(text,file,CALLBACK){
		fs.writeFile(file, text, function(err) {
		    if(err) {
		       	console.log(err);
		    }
		    if(typeof CALLBACK != "undefined") CALLBACK();
		}); 
	},
	exec: function(command, callback){
		exec(command,  function (error, stdout, stderr) {
			var retorno = {
				ERROR: error,
				STDOUT: stdout,
				STDERR: stderr
			};
    		if(typeof callback != "undefined") callback(retorno);
    	});
	},
	fetch: function(file,callback){
		if(typeof callback == "undefined") return;
		fs.readFile(file, 'utf8', function(err,datos) {
			callback(err,datos);
		});
	}

};
