const RecursiveObservable = require("./can-recursive-observable");
const canReflect = require("can-reflect");
const DefineObject = require("can-define-object");
const QUnit = require("steal-qunit");

QUnit.module("can-recursive-observable");

QUnit.test("Can convert deep objects", function(assert) {
	var out = canReflect.convert({
		a: "b",
		inner: {
			c: "d",
			deep: { e: "f" }
		},
		array: [
			{one: "two"}
		]
	}, RecursiveObservable);

	assert.ok(canReflect.isObservableLike(out), "is an observable");
	assert.ok(canReflect.isObservableLike(out.inner), "inner object is observable");
	assert.ok(canReflect.isObservableLike(out.inner.deep), "deep object is observable");
	assert.ok(canReflect.isObservableLike(out.array), "array is observable");
	assert.ok(Array.isArray(out.array), "array is still an array");
});

QUnit.test("Can be used as a type with DefineObject", function(assert) {
	class Faves extends DefineObject {
		static get define() {
			return {
				person: RecursiveObservable
			};
		}
	}

	let faves = new Faves({
		person: {
			name: { first: "Matthew", last: "Phillips" },
			birthday: new Date()
		}
	});

	assert.ok(canReflect.isObservableLike(faves.person), "converted");
	assert.ok(canReflect.isObservableLike(faves.person.name), "converted");
	assert.equal(faves.person.name.first, "Matthew", "strings left alone");
	assert.ok(faves.person.birthday instanceof Date, "dates left alone");
});
