module.exports = function(mucilage){
	var Promise = mucilage.Promise;
	return new Promise(function(resolve, reject){
		resolve({a: 1});
	});
};