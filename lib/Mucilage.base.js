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
		try {
			promise = factory(self);
		} catch (error){
			promise = Promise.reject(error);
		}
		module = {
			factory: factory,
			exports: promise
		};
		self._modules.push(module);
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
