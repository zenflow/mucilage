var _ = require('lodash');
var MucilageBase = require('./Mucilage.base');
var MucilageClient = function(opts){
    var self = this;
    MucilageBase.call(self, opts);
};
MucilageClient.prototype = _.create(MucilageBase.prototype);
module.exports = MucilageClient;