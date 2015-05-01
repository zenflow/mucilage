var test = require('tape');
var Mucilage = require('../lib/Mucilage');
var m_dummy = require('./dummy');

test('can init new mucilage', function(t) {
	t.plan(1);
	var m;
	try {
		m = new Mucilage;
	} catch (error) {
		t.fail(error);
		return;
	}
	t.pass('no errors');
});

test('dummy', function(t) {
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
test('dummy object', function(t) {
	t.plan(1);
	var m, dummy_promise;
	try {
		m = new Mucilage;
		dummy_promise = m.load({
			dummy_a: m_dummy,
			dummy_b: m_dummy
		});
	} catch (error) {
		return t.fail(error);
	}
	dummy_promise.then(function(dummy){
		t.deepEqual(dummy, {
			dummy_a: {a: 1},
			dummy_b: {a: 1}
		});
	}).catch(function(error){
		t.fail(error);
	})
});