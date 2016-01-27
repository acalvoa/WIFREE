var queued = {
	_STACK: [],
	queued: function(func, args){
		queued._STACK.push({
			action : func,
			args: args
		});
	},
	unqueued: function(){
		var next = queued._STACK.splice(0,1);
		return next[0];
	},
	clear: function(){
		queued._STACK = [];
	},
	start: function(){
		var next = queued._STACK.splice(0,1)[0];
		next.action(next.args);
	}
};
//EXPORTAMOS LOS MODULOS
module.exports.queued = queued.queued;
module.exports.unqueued = queued.unqueued;
module.exports.clear = queued.clear;
module.exports.start = queued.start;