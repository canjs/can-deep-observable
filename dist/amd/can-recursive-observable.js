/*can-recursive-observable@0.0.0#can-recursive-observable*/
define('can-recursive-observable', [
    'require',
    'exports',
    'module',
    'can-define-array',
    'can-define-object',
    'can-reflect',
    'can-type'
], function (require, exports, module) {
    const DefineArray = require('can-define-array');
    const DefineObject = require('can-define-object');
    const canReflect = require('can-reflect');
    const type = require('can-type');
    class RecursiveObservableObject extends DefineObject {
        static get propertyDefaults() {
            return type.maybeConvert(RecursiveObservable);
        }
    }
    class RecursiveObservableArray extends DefineArray {
        static get items() {
            return type.maybeConvert(RecursiveObservable);
        }
    }
    function isPlainArray(array) {
        return Array.isArray(array) && array.constructor === Array;
    }
    function RecursiveObservable() {
    }
    RecursiveObservable[Symbol.for('can.new')] = function (value) {
        if (isPlainArray(value)) {
            return new RecursiveObservableArray(...value);
        } else if (canReflect.isPlainObject(value)) {
            return new RecursiveObservableObject(value);
        } else {
            return value;
        }
    };
    module.exports = type.maybeConvert(RecursiveObservable);
});