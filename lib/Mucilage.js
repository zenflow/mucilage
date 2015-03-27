var connect = require('connect');
var util = require('util');
var MucilageBase = require('./Mucilage.base');
var MucilageServer = function(opts){
    var self = this;
    MucilageBase.call(self, opts);
	self.server = connect();
};
util.inherits(MucilageServer, MucilageBase);
module.exports = MucilageServer;