var test = require('tape');
var Mucilage = require('../lib/Mucilage');
var m_dummy = require('./dummy');

test('a', function(t) {
	t.plan(1);
	var m, dummy_promise;
	try {
		m = new Mucilage;
		dummy_promise = m.load(m_dummy);
	} catch (error) {
		return t.fail(error);
	}
	dummy_promise.then(function(dummy){
		t.deepEqual(dummy, {a: 1});
	}).catch(function(error){
		t.fail(error);
	})
});