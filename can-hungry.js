const DefineArray = require("can-define-array");
const DefineObject = require("can-define-object");
const canReflect = require("can-reflect");
const type = require("can-type");

class GreedyObject extends DefineObject {
	static get propertyDefaults() {
		return type.maybeConvert(Greedy);
	}
}

class GreedyArray extends DefineArray {
	static get items() {
		return type.maybeConvert(Greedy);
	}
}

function isPlainArray(array) {
	return Array.isArray(array) && array.constructor === Array;
}

function Greedy(){}

Greedy[Symbol.for("can.new")] = function(value) {
	var r = canReflect;
	if(isPlainArray(value)) {
		return new GreedyArray(...value);
	}
	else if(canReflect.isPlainObject(value)) {
		return new GreedyObject(value);
	} else {
		return value;
	}
};

module.exports = type.maybeConvert(Greedy);
