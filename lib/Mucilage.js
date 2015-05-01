var _ = require('lodash');
var connect = require('connect');
var MucilageBase = require('./Mucilage.base');
var MucilageServer = function(opts){
    var self = this;
    MucilageBase.call(self, opts);
	self.server = connect();
};
MucilageServer.prototype = _.create(MucilageBase.prototype);
MucilageClient.prototype.on_server = true;
MucilageClient.prototype.on_client = false;
module.exports = MucilageServer;