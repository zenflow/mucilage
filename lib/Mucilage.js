var _ = require('lodash');
var connect = require('connect');
var MucilageBase = require('./Mucilage.base');
var MucilageServer = function(opts){
    var self = this;
    MucilageBase.call(self, opts);
	self.server = connect();
};
MucilageServer.prototype = _.create(MucilageBase.prototype);
module.exports = MucilageServer;