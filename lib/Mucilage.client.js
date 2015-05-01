var _ = require('lodash');
var MucilageBase = require('./Mucilage.base');
var MucilageClient = function(opts){
    var self = this;
    MucilageBase.call(self, opts);
};
MucilageClient.prototype = _.create(MucilageBase.prototype);
MucilageClient.prototype.on_client = true;
MucilageClient.prototype.on_server = false;
module.exports = MucilageClient;