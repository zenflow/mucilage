var util = require('util');
var MucilageBase = require('./Mucilage.base');
var MucilageClient = function(opts){
    var self = this;
    MucilageBase.call(self, opts);
};
util.inherits(MucilageClient, MucilageBase);
module.exports = MucilageClient;