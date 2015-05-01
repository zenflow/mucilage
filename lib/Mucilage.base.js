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
			factory: factory, // id
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
MucilageBase.prototype._loadObject = function(factories){
	var self = this;
	var result = {};
	var promises = _.map(factories, function(factory, factory_name){
		return self._loadSingle(factory).then(function(exports){
			result[factory_name] = exports;
		});
	});
	return Promise.all(promises).then(function(){
		return result;
	});
};
MucilageBase.prototype.load = function(factories) {
	var self = this;
	var promise;
	switch (typeof factories){
		case 'function':
			promise = self._loadSingle(factories);
			break;
		case 'array':
			promise = self._loadArray(factories);
			break;
		case 'object':
			promise = self._loadObject(factories);
			break;
		default:
			throw new Error('Unexpected input type "'+(typeof factories));
	}
	return promise;
};
module.exports = MucilageBase;
