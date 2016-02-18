var express = require('express');
var config  = require('../core/config.js');
var iptables = require('../core/iptables.js');
module.exports = {
	allow: function(req,res,callback){
		iptables.allow(req.query.mac, function(){
			if(typeof callback != "undefined") callback();
		});
	},
	allowme: function(req,res,callback){
		console.log(req.connection.remoteAddress);
		iptables.getMACfromIP(req.connection.remoteAddress);
	}
};
