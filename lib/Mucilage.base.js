var _ = require('lodash');
var async = require('async');

var MucilageBase = function(opts){
    var self = this;
    self._modules = [];
	self.endpoint = opts && opts.endpoint || '/mucilage';
};

MucilageBase.prototype._load = function(factory, cb) {
    var self = this;
	var module = _.find(self._modules, function (module) {
		return module.factory == factory;
	});
	if (module){
		if (module.callbacks){
			module.callbacks.push(cb);
		} else {
			cb(module.error, module.exports);
		}
	} else {
		module = {
			factory: factory,
			callbacks: [cb],
			error: undefined,
			exports: undefined
		};
		self._modules.push(module);
		var returned = false;
		factory(self, function(error, exports){
			if (returned){throw new Error('Module should only return via callback once');}
			returned = true;
			module.error = error;
			module.exports = exports;
			var callbacks = module.callbacks;
			delete module.callbacks;
			_.forEach(callbacks, function (cb) {
				cb(error, exports);
			});
		});
	}
};
MucilageBase.prototype._loadMultiple = function(factories, cb){
	var self = this;
	async.map(factories, self._load, function(error, exports){
		if (error){return cb(error);}
		cb.apply(null, [null].concat(exports));
	})
};
var default_callback = function(error){
	if (error){throw error;}
};
MucilageBase.prototype.load = function(factories, cb) {
	var self = this;
	if (typeof factories=='array'){
		self._loadMultiple(factories, cb || default_callback);
	} else {
		self._load(factories, cb || default_callback);
	}
}
module.exports = MucilageBase;
