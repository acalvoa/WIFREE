var express = require('express');
var config  = require('../core/config.js');
var iptables = require('../core/iptables.js');
module.exports = {
	allow: function(datos, callback){
		iptables.allow(datos.mac, function(){
			if(typeof callback != "undefined") callback();
		});
	}
};
