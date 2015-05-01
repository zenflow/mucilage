var _ = require('lodash');
var Promise = require('es6-promises');

var MucilageBase = function(opts){
    var self = this;
    self._modules = [];
	self.endpoint = opts && opts.endpoint || '/mucilage';
};
MucilageBase.prototype.Promise = Promise;
MucilageBase.prototype._loadSingle = function(factory) {
    var self = this;
	var module = _.find(self._modules, function (module) {
		return module.factory == factory
	});
	var promise;
	if (module){
		promise = Promise.resolve(module.exports);
	} else {
		var initial_promise;
		try {
			initial_promise = Promise.resolve(factory(self));
		} catch (error){
			initial_promise = Promise.reject(error);
		}

		module = {
			factory: factory,
			exports: initial_promise
		};
		self._modules.push(module);

		// minor optimization
		promise = initial_promise.then(function(exports){
			module.exports = exports;
			return exports;
		});
	}
	return promise;
};
MucilageBase.prototype._loadArray = function(factories){
	var self = this;
	return Promise.all(_.map(factories, function(factory){
		return self._loadSingle(factory);
	}));
};
MucilageBase.prototype.load = function(factories) {
	var self = this;
	var promise;
	if (typeof factories=='array'){
		promise = self._loadArray(factories);
	} else {
		promise = self._loadSingle(factories);
	}
	return promise;
};
module.exports = MucilageBase;
