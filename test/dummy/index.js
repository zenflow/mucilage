module.exports = function(m){
	var Promise = m.Promise;
	return {a: 1};
	// -- equivalent to --
	return new Promise(function(resolve, reject){
		resolve({a: 1});
	});
};